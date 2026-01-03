---
title: "在 Windows 上用 Claude Code +「虾推啥」把任务完成提醒推到微信（附一键安装脚本 & 卸载脚本）"
date: Fri Jan 02 2026 23:54:58 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#windows","#微信"]
summary: ""
author: "xianyu120"
status: "Published"
---

## 在 Windows 上用 Claude Code +「虾推啥」把任务完成提醒推到微信（附一键安装脚本 & 卸载脚本）

> 本文给出一套 **Windows 原生** 的做法，让 Claude Code 在回答/任务完成（`Stop`
> 事件）时，通过「虾推啥」把通知推送到你的微信。提供 **一键安装脚本** 、可选的 **手动配置** 、**卸载/回滚** 、以及常见问题与进阶玩法。

* * *

### 适用场景

  * 你经常用 Claude Code 执行较长任务（跑脚本/生成大段代码/处理数据），不想一直盯着编辑器。
  * 希望任务结束自动推送到微信，做到“**该提醒时提醒** ，其余时间安静”。
  * 你的主力环境是 **Windows** （无需 WSL / Git Bash，纯 PowerShell 即可）。

* * *

### 工作原理（一句话版）

Claude Code 支持 **hooks** ：当会话进入某个生命周期事件（如 `Stop`）时，自动执行我们配置的命令。我们把命令指向一个
PowerShell 脚本，这个脚本调用「虾推啥」的 HTTP 接口发送一条微信消息 → 你就能在手机上收到“任务完成”的提醒。

> **事件说明** ：`Stop` 触发于 Claude Code 本轮生成/执行完成，最适合“任务完成提醒”。

* * *

### 准备工作

  1. **拿到你的「虾推啥」 Token**  
用微信搜索/关注“虾推啥”小程序/公众号，按提示绑定后会获得一个专属 Token，形如 `0x...`。后续脚本会用到它。

  2. **确保能运行 PowerShell 脚本**  
默认即可，如果你从未启用过脚本执行权限，安装脚本会为当前用户设置为 `RemoteSigned`。

* * *

### 方案 A：一键安装脚本（推荐）

将下方内容保存为 **`claude-wechat-notify-setup.ps1`** （确保编码为 UTF‑8），然后右键“用 PowerShell
运行”，或在终端中执行：

    
    
    powershell -ExecutionPolicy Bypass -File .\claude-wechat-notify-setup.ps1 -Token YOUR_TOKEN
    

**脚本源码：**

    
    
    [CmdletBinding(SupportsShouldProcess=$true)]
    param(
      [string]$Token
    )
    
    Write-Host "=== Claude Code 微信提醒（虾推啥）一键安装 ===" -ForegroundColor Cyan
    
    if (-not $Token -or $Token.Trim() -eq "") {
      $Token = Read-Host "请输入你的虾推啥 Token（形如 0x...）"
    }
    
    if (-not $Token -or $Token.Trim() -eq "") {
      Write-Error "未提供 Token，结束。"
      exit 1
    }
    
    $Home = $env:USERPROFILE
    $ClaudeDir = Join-Path $Home ".claude"
    $HooksDir = Join-Path $ClaudeDir "hooks"
    $NotifyScript = Join-Path $HooksDir "notify.ps1"
    $SettingsJson = Join-Path $ClaudeDir "settings.json"
    
    # 1) 创建目录
    New-Item -ItemType Directory -Force $HooksDir | Out-Null
    
    # 2) 生成 notify.ps1（固定写入你的 Token）
    $notifyContent = @"
    `$Token   = "$Token"
    `$Url     = "https://wx.xtuis.cn/`$Token.send"
    `$Time    = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    `$Session = Split-Path -Leaf (Get-Location)
    
    try {
      Invoke-WebRequest -Uri `$Url -Method POST -Body @{
        text = "✅ Claude Code 任务完成"
        desp = "会话: `$Session`n时间: `$Time"
      } | Out-Null
      Write-Host "已发送通知到微信（虾推啥）。"
    } catch {
      Write-Error "发送失败：$($_.Exception.Message)"
      exit 2
    }
    "@
    
    Set-Content -Encoding UTF8 -Path $NotifyScript -Value $notifyContent
    
    # 3) 允许运行当前用户脚本（若已设置会自动跳过）
    try {
      Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    } catch { }
    
    # 4) 合并写入 settings.json（保留原有配置，如有则备份）
    $settingsObj = $null
    if (Test-Path $SettingsJson) {
      $backup = "$SettingsJson.bak_{0:yyyyMMdd_HHmmss}" -f (Get-Date)
      Copy-Item $SettingsJson $backup -Force
      try {
        $settingsObj = Get-Content $SettingsJson -Raw | ConvertFrom-Json -Depth 64
      } catch {
        Write-Warning "settings.json 不是合法 JSON，将用空配置重建。"
      }
    }
    if (-not $settingsObj) {
      $settingsObj = [pscustomobject]@{}
    }
    
    # 确保 hooks 与 Stop 数组存在
    if (-not ($settingsObj | Get-Member -Name hooks -MemberType NoteProperty)) {
      Add-Member -InputObject $settingsObj -NotePropertyName hooks -NotePropertyValue ([pscustomobject]@{}) -Force
    }
    if (-not ($settingsObj.hooks | Get-Member -Name Stop -MemberType NoteProperty)) {
      Add-Member -InputObject $settingsObj.hooks -NotePropertyName Stop -NotePropertyValue @() -Force
    }
    
    # 目标命令（不要改路径；JSON 序列化时会自动转义反斜杠）
    $powershellCmd = 'powershell -NoProfile -ExecutionPolicy Bypass -File "$env:USERPROFILE\\.claude\\hooks\\notify.ps1"'
    
    # 判断是否已存在同命令的 hook，避免重复注入
    $already = $false
    foreach ($g in $settingsObj.hooks.Stop) {
      if ($null -ne $g -and ($g | Get-Member -Name hooks -MemberType NoteProperty)) {
        foreach ($h in $g.hooks) {
          if ($h -and ($h | Get-Member -Name command -MemberType NoteProperty) -and $h.command -eq $powershellCmd) {
            $already = $true; break
          }
        }
      }
    }
    if (-not $already) {
      # 追加一个新的 Stop 组（matcher 为空，始终匹配）
      $settingsObj.hooks.Stop += [pscustomobject]@{
        matcher = ""
        hooks   = @([pscustomobject]@{ type = "command"; command = $powershellCmd })
      }
    }
    
    # 写回 JSON
    $settingsJsonStr = $settingsObj | ConvertTo-Json -Depth 64
    Set-Content -Encoding UTF8 -Path $SettingsJson -Value $settingsJsonStr
    
    Write-Host "配置已写入：$SettingsJson" -ForegroundColor Green
    Write-Host "hooks 脚本：$NotifyScript" -ForegroundColor Green
    
    # 5) 发送一次测试通知
    Write-Host "发送测试通知..." -ForegroundColor Yellow
    & $NotifyScript
    
    Write-Host "完成！后续 Claude Code 触发 Stop 事件时将推送微信提醒（虾推啥）。" -ForegroundColor Cyan
    

#### 安装脚本会做什么？

  1. 在 `~\\.claude\\hooks\\` 创建 `notify.ps1`，内含你的 Token。
  2. 为当前用户启用脚本执行权限（`RemoteSigned`）。
  3. 备份 `~\\.claude\\settings.json` 并合并写入 `Stop` 钩子。
  4. 立即发送一条 **测试通知** 到微信，验证链路。

> **提示** ：`~` 在 Windows 下等于 `%USERPROFILE%`，例如 `C:\Users\你的用户名`。

* * *

### 方案 B：手动配置（可选）

如果你偏好手工：

#### 1）创建通知脚本 `notify.ps1`

    
    
    $Token   = "YOUR_TOKEN"
    $Url     = "https://wx.xtuis.cn/$Token.send"
    $Time    = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Session = Split-Path -Leaf (Get-Location)
    
    Invoke-WebRequest -Uri $Url -Method POST -Body @{
      text = "✅ Claude Code 任务完成"
      desp = "会话: $Session`n时间: $Time"
    } | Out-Null
    

保存到 `C:\Users\<你>\\.claude\\hooks\\notify.ps1`。

#### 2）允许运行脚本（一次性）

    
    
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    

#### 3）写入 hooks（`~\\.claude\\settings.json`）

    
    
    {
      "hooks": {
        "Stop": [
          {
            "matcher": "",
            "hooks": [
              {
                "type": "command",
                "command": "powershell -NoProfile -ExecutionPolicy Bypass -File \"$env:USERPROFILE\\\\.claude\\\\hooks\\\\notify.ps1\""
              }
            ]
          }
        ]
      }
    }
    

#### 4）自测

    
    
    powershell -File "$env:USERPROFILE\.claude\hooks\notify.ps1"
    

随后在 Claude Code 中触发一次 `Stop`（例如让它回答一句“hello”），观察手机是否收到提醒。

* * *

### 卸载 / 回滚

#### 方式 1：一键卸载脚本（安全移除 hook + 清理脚本）

将下方保存为 **`claude-wechat-notify-uninstall.ps1`** 并运行：

    
    
    $Home = $env:USERPROFILE
    $ClaudeDir = Join-Path $Home ".claude"
    $HooksDir = Join-Path $ClaudeDir "hooks"
    $NotifyScript = Join-Path $HooksDir "notify.ps1"
    $SettingsJson = Join-Path $ClaudeDir "settings.json"
    $powershellCmd = 'powershell -NoProfile -ExecutionPolicy Bypass -File "$env:USERPROFILE\\.claude\\hooks\\notify.ps1"'
    
    if (Test-Path $SettingsJson) {
      $backup = "$SettingsJson.uninstallbak_{0:yyyyMMdd_HHmmss}" -f (Get-Date)
      Copy-Item $SettingsJson $backup -Force
      try {
        $obj = Get-Content $SettingsJson -Raw | ConvertFrom-Json -Depth 64
        if ($obj -and $obj.hooks -and $obj.hooks.Stop) {
          $newStops = @()
          foreach ($g in $obj.hooks.Stop) {
            if ($g -and $g.hooks) {
              $g.hooks = @($g.hooks | Where-Object { $_.command -ne $powershellCmd })
              if ($g.hooks.Count -gt 0) { $newStops += $g }
            }
          }
          $obj.hooks.Stop = $newStops
          ($obj | ConvertTo-Json -Depth 64) | Set-Content -Encoding UTF8 $SettingsJson
          Write-Host "已移除 Stop 钩子中的通知命令。" -ForegroundColor Green
        }
      } catch {
        Write-Warning "解析 settings.json 失败，已保留备份：$backup"
      }
    }
    
    if (Test-Path $NotifyScript) { Remove-Item $NotifyScript -Force }
    Write-Host "已删除 hooks/notify.ps1。" -ForegroundColor Green
    Write-Host "卸载完成。" -ForegroundColor Cyan
    

#### 方式 2：完整回滚到备份

安装脚本会在同目录生成 `settings.json.bak_YYYYMMDD_HHMMSS`。若想回到安装前状态：

    
    
    Copy-Item "$env:USERPROFILE\.claude\settings.json.bak_YYYYMMDD_HHMMSS" "$env:USERPROFILE\.claude\settings.json" -Force
    

然后手动删除 `~\\.claude\\hooks\\notify.ps1`。

* * *

### 常见问题（FAQ）

**Q1：运行脚本提示执行策略限制？**  
A：确保以当前用户身份执行过：

    
    
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    

**Q2：收不到微信提醒？**

  * 确认 Token 正确（无空格、未过期）。

  * 本机可访问 `wx.xtuis.cn`（内网/代理环境可能需放行）。

  * 查看 `settings.json` 中 `command` 路径是否正确，反斜杠需要双写 `\\`。

  * 在项目目录下手动执行 `notify.ps1` 验证网络与 Token：
    
        powershell -File "$env:USERPROFILE\.claude\hooks\notify.ps1"
    

**Q3：只想在某个项目启用提醒？**  
在该项目根目录下创建 `./.claude/settings.local.json` 写入与上文相同的 `hooks` 片段（项目级覆盖，不影响全局）。

**Q4：想要本地弹窗，不走微信？**  
把 `command` 改成：

    
    
    cmd /c msg * "Claude Code 回答完成!"
    

这会弹出系统消息，不依赖外网。

**Q5：如何自定义提醒内容？**  
修改 `notify.ps1` 的 `text` 与 `desp` 字段；你也可以将当前文件名、分支名、时间等拼接进去。

* * *

### 进阶玩法

  * **按关键字匹配触发** ：将 `matcher` 写为正则表达式，仅当会话内容匹配时才触发。
  * **多渠道并发** ：在同一 `Stop` 组里追加多个 `command`（如同时推送到飞书/Slack 的 Webhook）。
  * **按会话/语言分组** ：给不同项目写不同的 `settings.local.json`，并在 `desp` 中注入项目名以便区分。

* * *

### 结语

以上方案完全基于 **Windows + PowerShell** 与 Claude Code 原生 hooks
实现，无需额外依赖。推荐用“一键安装脚本”快速起步，再按需定制通知文案与触发条件。也欢迎将脚本纳入你的团队模版仓库，提升协作效率。

> 许可：本文与脚本以 **MIT** 许可开源；转载请注明出处。

