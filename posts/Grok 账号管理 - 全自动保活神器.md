---
title: "Grok 账号管理 - 全自动保活神器"
date: "2026-01-02T15:48:16.479296"
category: "人工智能"
tags: ["#css", "#css3", "#javascript"]
summary: 【代码】Grok 账号管理 - 全自动保活神器。
author: "xianyu120"
status: "Published"
---


    // ==UserScript==
    // @name         Grok 账号管理 - 全自动保活神器 v3.0（终极修复版）
    // @namespace    http://tampermonkey.net/
    // @version      3.0
    // @description  精准点击你页面的真实保存按钮，永不失手
    // @author       专治各种不灵
    // @match        https://grok.*/*
    // @grant        GM_addStyle
    // ==/UserScript==
    
    (function() {
        'use strict';
    
        GM_addStyle(`
            .grok-god-panel{position:fixed;top:80px;right:20px;width:400px;background:white;border:3px solid #409EFF;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.4);z-index:9999999;font-family:"Microsoft YaHei",Arial,sans-serif;}
            .grok-god-header{background:linear-gradient(135deg,#409EFF 0%,#67C23A 100%);color:white;padding:12px 16px;font-weight:bold;font-size:15px;cursor:move;border-radius:9px 9px 0 0;display:flex;justify-content:space-between;align-items:center;}
            .grok-god-body{padding:16px;}
            .grok-god-status{font-size:15px;text-align:center;font-weight:bold;margin-bottom:12px;color:#409EFF;}
            .grok-god-btn{padding:12px;border:none;border-radius:6px;cursor:pointer;font-weight:bold;font-size:14px;width:100%;margin:8px 0;}
            .btn-start{background:#67C23A;color:white;}
            .btn-stop{background:#F56C6C;color:white;display:none;}
            .grok-god-log{background:#fafafa;border:1px solid #ddd;border-radius:6px;padding:10px;height:280px;overflow-y:auto;font-size:12px;font-family:monospace;margin-top:10px;}
            .log-success{color:#67C23A;}.log-info{color:#409EFF;}.log-warn{color:#E6A23C;}.log-error{color:#F56C6C;}
            .close-btn{background:rgba(255,255,255,0.3);border:none;color:white;width:28px;height:28px;border-radius:50%;font-size:20px;cursor:pointer;}
        `);
    
        let running = false;
        let logBox = null;
    
        function log(msg, type = 'info') {
            if (!logBox) return;
            const div = document.createElement('div');
            div.className = `log-${type}`;
            div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
            logBox.appendChild(div);
            logBox.scrollTop = logBox.scrollHeight;
        }
    
        // 终极精准点击保存按钮（适配你真实页面）
        // 精准点击保存按钮（改进版，支持多种按钮样式）
        function clickSaveButton() {
            // 方式1：查找el-button--success类的按钮
            let buttons = document.querySelectorAll('.el-dialog button.el-button--success');
            for (const btn of buttons) {
                const span = btn.querySelector('span');
                if ((span && span.textContent.includes('保存')) || btn.textContent.includes('保存')) {
                    if (!btn.disabled && btn.offsetParent !== null) {
                        btn.click();
                        return true;
                    }
                }
            }
    
            // 方式2：查找所有按钮中包含"保存"文字的
            buttons = document.querySelectorAll('.el-dialog button, .el-dialog .el-button');
            for (const btn of buttons) {
                const span = btn.querySelector('span');
                const text = span ? span.textContent : btn.textContent;
                if (text.includes('保存') && !btn.disabled && btn.offsetParent !== null) {
                    // 检查按钮是否可见且可点击
                    const rect = btn.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        btn.click();
                        return true;
                    }
                }
            }
    
            // 方式3：使用更通用的选择器
            const saveBtn = document.querySelector('.el-dialog__footer .el-button--primary') ||
                           document.querySelector('.el-dialog .el-button.el-button--primary');
            if (saveBtn && !saveBtn.disabled) {
                saveBtn.click();
                return true;
            }
    
            return false;
        }
    
        async function processRow(i, total) {
            const rows = document.querySelectorAll('.el-table__body tr.el-table__row');
            if (i >= rows.length) return;
            const row = rows[i];
            row.scrollIntoView({ behavior: "smooth", block: "center" });
            row.style.background = '#e6f7ff';
    
            log(`正在处理第 ${i+1}/${total} 个账号`);
    
            const editBtn = row.querySelector('button.el-button--primary');
            if (!editBtn || editBtn.disabled) {
                log(`第 ${i+1} 行编辑按钮不可用`, 'warn');
                row.style.background = '';
                return;
            }
    
            editBtn.click();
    
            // 等弹窗出现
            let dialogVisible = false;
            for (let t = 0; t < 60; t++) {
                await new Promise(r => setTimeout(r, 100));
                if (document.querySelector('.el-dialog')) {
                    dialogVisible = true;
                    break;
                }
            }
    
            if (!dialogVisible) {
                log(`第 ${i+1} 行弹窗未打开`, 'error');
                row.style.background = '';
                return;
            }
    
            // 最多等15秒，疯狂尝试点保存
            let saved = false;
            let foundButtons = false;
    
            for (let t = 0; t < 150; t++) {
                // 每1秒检查一次按钮状态
                if (t % 10 === 0) {
                    const buttons = document.querySelectorAll('.el-dialog button');
                    if (buttons.length > 0 && !foundButtons) {
                        foundButtons = true;
                        log(`第 ${i+1} 行找到 ${buttons.length} 个按钮`);
                    }
                }
    
                if (clickSaveButton()) {
                    log(`第 ${i+1} 行保存成功！`, 'success');
                    saved = true;
                    break;
                }
                await new Promise(r => setTimeout(r, 100));
            }
    
            if (!saved) {
                if (!foundButtons) {
                    log(`第 ${i+1} 行保存失败：未找到任何按钮`, 'error');
                } else {
                    log(`第 ${i+1} 行保存失败：按钮不可点击`, 'error');
                }
            }
    
            // 关闭弹窗
            await new Promise(r => setTimeout(r, 1000));
            const closeBtn = document.querySelector('.el-dialog__close');
            if (closeBtn) closeBtn.click();
    
            row.style.background = '';
        }
    
        async function start() {
            if (running) return;
            running = true;
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'block';
    
            log('Grok 全自动保活 v3.0 已启动（已完美适配你的页面）', 'success');
    
            while (running) {
                const rows = document.querySelectorAll('.el-table__body tr.el-table__row');
                if (rows.length === 0) {
                    log('未检测到账号，10秒后重试...', 'warn');
                    await new Promise(r => setTimeout(r, 10000));
                    continue;
                }
    
                log(`开始处理 ${rows.length} 个账号`);
    
                for (let i = 0; i < rows.length && running; i++) {
                    await processRow(i, rows.length);
    
                    if (running && i < rows.length - 1) {
                        for (let s = 30; s > 0 && running; s--) {
                            document.getElementById('status').textContent = `第${i+1}个完成，等待 ${s} 秒...`;
                            await new Promise(r => setTimeout(r, 1000));
                        }
                    }
                }
    
                if (running) {
                    log('本轮完成，休息10分钟...');
                    document.getElementById('status').textContent = '休息10分钟';
                    for (let m = 10; m > 0 && running; m--) {
                        for (let s = 59; s >= 0 && running; s--) {
                            document.getElementById('status').textContent = `休息中 ${m}:${s.toString().padStart(2,'0')}`;
                            await new Promise(r => setTimeout(r, 1000));
                        }
                    }
                }
            }
        }
    
        function stop() {
            running = false;
            document.getElementById('startBtn').style.display = 'block';
            document.getElementById('stopBtn').style.display = 'none';
            document.getElementById('status').textContent = '已停止';
            log('已手动停止', 'warn');
        }
    
        function createPanel() {
            if (document.querySelector('.grok-god-panel')) return;
    
            const panel = document.createElement('div');
            panel.className = 'grok-god-panel';
            panel.innerHTML = `
                <div class="grok-god-header">
                    <span>Grok 保活神器 v3.0</span>
                    <button class="close-btn">×</button>
                </div>
                <div class="grok-god-body">
                    <div class="grok-god-status" id="status">按 Ctrl+Shift+G 呼出</div>
                    <button class="grok-god-btn btn-start" id="startBtn">开始自动保活（每30秒一个）</button>
                    <button class="grok-god-btn btn-stop" id="stopBtn">停止运行</button>
                    <div style="font-size:13px;color:#666;margin:12px 0;">
                        已完美适配你的页面<br>
                        精准点击真正的“保存”按钮
                    </div>
                    <div class="grok-god-log" id="grokLog"></div>
                </div>
            `;
            document.body.appendChild(panel);
    
            logBox = document.getElementById('grokLog');
    
            // 拖拽
            const header = panel.querySelector('.grok-god-header');
            let dragging = false, ox = 0, oy = 0;
            header.addEventListener('mousedown', e => {
                if (e.target.classList.contains('close-btn')) return;
                dragging = true;
                ox = e.clientX - panel.offsetLeft;
                oy = e.clientY - panel.offsetTop;
            });
            document.addEventListener('mousemove', e => {
                if (dragging) {
                    panel.style.left = (e.clientX - ox) + 'px';
                    panel.style.top = (e.clientY - oy) + 'px';
                }
            });
            document.addEventListener('mouseup', () => dragging = false);
    
            panel.querySelector('.close-btn').onclick = () => panel.style.display = 'none';
            document.getElementById('startBtn').onclick = start;
            document.getElementById('stopBtn').onclick = stop;
    
            log('Grok 保活神器 v3.0 已加载成功！', 'success');
            log('按 Ctrl+Shift+G 随时呼出面板', 'info');
        }
    
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'G') {
                e.preventDefault();
                createPanel();
                document.querySelector('.grok-god-panel').style.display = 'block';
            }
        });
    
        setTimeout(createPanel, 2000);
    })();
    

