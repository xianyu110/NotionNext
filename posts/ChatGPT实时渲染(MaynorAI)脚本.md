---
title: "ChatGPT实时渲染(MaynorAI)脚本"
date: Fri Jan 02 2026 23:53:51 GMT+0800 (China Standard Time)
category: "人工智能"
tags: ["#chatgpt"]
summary: ""
author: "xianyu120"
status: "Published"
---


    // ==UserScript==
    // @name           ChatGPT实时渲染(MaynorAI)
    // @namespace      github.com/maynor/chatgpt-preview
    // @version        1.5.0
    // @description    为ChatGPT添加代码实时预览功能，支持多种编程语言的实时渲染，修复复制按钮功能
    // @author         Maynor
    // @match          https://chat.openai.com/*
    // @match          https://chatgpt.com/*
    // @match          https://chatgpt-plus.top/*
    // @match          https://*.maynor1024.live/*
    // @license        GPL-2.0-only
    // @homepageURL    https://github.com/maynor/chatgpt-preview
    // @supportURL     https://github.com/maynor/chatgpt-preview/issues
    // @run-at         document-end
    // @grant          none
    // ==/UserScript==
    
    (function () {
        "use strict";
    
        // 注入样式
        addStyles();
    
        // 使用 MutationObserver 监听 DOM 变化
        const observer = new MutationObserver(debounce(xuanranHTML, 500));
        const createIframeObserver = new MutationObserver(
            debounce(createIframe, 500)
        );
    
        // 观察目标节点的变化
        observer.observe(document.body, { childList: true, subtree: true });
        createIframeObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    
        // 首次调用渲染
        window.addEventListener("load", () => {
            setTimeout(xuanranHTML, 1000);
            setTimeout(createIframe, 1000);
        });
    })();
    
    // 添加 CSS 样式
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .maynor-toggle-container {
                display: flex;
                background: #e5e7eb;
                padding: 2px;
                border-radius: 6px;
                position: absolute;
                top: 10px;
                right: 50px;
                z-index: 1001;
            }
            .maynor-toggle-btn {
                padding: 4px 12px;
                border: none;
                background: transparent;
                border-radius: 4px;
                font-size: 13px;
                font-weight: 500;
                color: #6b7280;
                cursor: pointer;
                transition: all 0.2s;
            }
            .maynor-toggle-btn.active {
                background: white;
                color: #374151;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .maynor-toggle-btn:hover:not(.active) {
                color: #374151;
            }
            .maynor-inline-tabs {
                display: flex;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 0; /* 修改: 紧贴内容 */
                background: #f9fafb;
                border-radius: 8px 8px 0 0;
                padding: 0 10px;
            }
            .maynor-inline-tab {
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                color: #6b7280;
                border-bottom: 2px solid transparent;
                margin-bottom: -1px;
            }
            .maynor-inline-tab.active {
                color: #10a37f;
                border-bottom: 2px solid #10a37f;
                font-weight: 600;
            }
            .maynor-inline-content-wrapper {
                border: 1px solid #e5e7eb;
                border-top: none;
                border-radius: 0 0 8px 8px;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    function createIframe() {
        if (document.getElementById("dynamicContentIframe")) return;
    
        const mainElement = document.querySelector("main");
    
        if (mainElement) {
            mainElement.style.overflow = "hidden";
    
            // 1. Iframe
            const iframe = document.createElement("iframe");
            iframe.id = "dynamicContentIframe";
            iframe.style.position = "relative";
            iframe.style.display = "block";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.backgroundColor = "#FFFDF6";
            iframe.style.border = "none";
            iframe.sandbox = "allow-scripts allow-modals allow-forms allow-popups allow-same-origin";
            iframe.srcdoc = "<html><body></body></html>";
    
            // 2. Code Container
            const codeContainer = document.createElement("div");
            codeContainer.id = "codeContainer";
            codeContainer.style.width = "100%";
            codeContainer.style.height = "100%";
            codeContainer.style.zIndex = "1000";
            codeContainer.style.display = "none";
            codeContainer.style.overflow = "hidden";
            codeContainer.style.overflowY = "auto";
            codeContainer.style.backgroundColor = "#fff";
            codeContainer.style.padding = "20px";
            codeContainer.style.boxSizing = "border-box";
    
            // 3. Toggle Buttons
            const toggleContainer = document.createElement("div");
            toggleContainer.className = "maynor-toggle-container";
    
            const btnPreview = document.createElement("button");
            btnPreview.className = "maynor-toggle-btn active";
            btnPreview.innerText = "预览";
    
            const btnCode = document.createElement("button");
            btnCode.className = "maynor-toggle-btn";
            btnCode.innerText = "代码";
    
            btnPreview.onclick = () => {
                btnPreview.classList.add("active");
                btnCode.classList.remove("active");
                iframe.style.display = "block";
                codeContainer.style.display = "none";
            };
    
            btnCode.onclick = () => {
                btnCode.classList.add("active");
                btnPreview.classList.remove("active");
                iframe.style.display = "none";
                codeContainer.style.display = "block";
            };
    
            toggleContainer.appendChild(btnPreview);
            toggleContainer.appendChild(btnCode);
    
            // 4. Minimize Button
            const minimizeButton = document.createElement("div");
            minimizeButton.id = "minimizeButton";
            minimizeButton.style.position = "absolute";
            minimizeButton.style.top = "12px";
            minimizeButton.style.right = "15px";
            minimizeButton.style.cursor = "pointer";
            minimizeButton.style.zIndex = "1002";
            minimizeButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            minimizeButton.onclick = () => {
                iframe.style.display = iframe.style.display === "none" ? "block" : "none";
                const main = document.querySelector("main");
                main.style.display = main.style.display === "block" ? "flex" : "block";
    
                const sidebarBtn = document.querySelector(
                    "body > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary.max-md\\:\\!w-0 > div > div > div > nav > div.flex.justify-between.flex.h-\\[60px\\].items-center.md\\:h-header-height > span > button"
                );
                if (sidebarBtn) sidebarBtn.click();
            };
    
            // 5. Assembly
            const controlsWrapper = document.createElement("div");
            controlsWrapper.id = "controlsWrapper";
            controlsWrapper.style.position = "absolute";
            controlsWrapper.style.top = "0";
            controlsWrapper.style.right = "0";
            controlsWrapper.style.width = "100%";
            controlsWrapper.style.height = "50px";
            controlsWrapper.style.pointerEvents = "none";
    
            toggleContainer.style.pointerEvents = "auto";
            minimizeButton.style.pointerEvents = "auto";
    
            controlsWrapper.appendChild(toggleContainer);
            controlsWrapper.appendChild(minimizeButton);
    
            mainElement.style.position = "relative";
            mainElement.appendChild(iframe);
            mainElement.appendChild(codeContainer);
            mainElement.appendChild(controlsWrapper);
        }
    }
    
    // 核心功能：修复复制按钮
    function enableCopyButton(container, codeText) {
        // 查找复制按钮 (使用用户提供的精确 class)
        // 同时也尝试查找通常的 button 结构以防 class 变化
        const buttons = container.querySelectorAll("button");
    
        buttons.forEach(btn => {
            // 简单的判断：如果包含 "复制" 字样 或者 有特定的 svg
            const isCopyBtn = btn.innerText.includes("复制") ||
                              btn.innerText.includes("Copy") ||
                              btn.querySelector('svg') ||
                              btn.classList.contains('gap-1'); // 针对用户提供的类名特征
    
            if (isCopyBtn) {
                // 移除旧的事件监听器 (cloneNode 已经移除了，这里是逻辑重置)
                // 强制替换为新的节点以去除所有可能残留的 React 绑定干扰
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
    
                newBtn.style.cursor = "pointer";
                newBtn.onclick = async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
    
                    try {
                        await navigator.clipboard.writeText(codeText);
    
                        // 保存原始 HTML
                        const originalHTML = newBtn.innerHTML;
    
                        // 设置成功状态
                        newBtn.innerHTML = `
                            <div style="display:flex; align-items:center; gap:4px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>已复制</span>
                            </div>
                        `;
    
                        // 2秒后恢复
                        setTimeout(() => {
                            newBtn.innerHTML = originalHTML;
                        }, 2000);
                    } catch (err) {
                        console.error("复制失败:", err);
                        alert("复制失败，请手动复制");
                    }
                };
            }
        });
    }
    
    function xuanranHTML() {
        const codes = document.querySelectorAll(".overflow-y-auto.p-4 code");
    
        codes.forEach((codeElement) => {
            if (codeElement.classList.contains("processed")) return;
            codeElement.classList.add("processed");
    
            const typeDiv = codeElement.parentNode.parentNode.children[0];
            if (!typeDiv) return;
    
            const codeType = typeDiv.innerText.toLowerCase();
            const isSVGContent = codeElement.textContent.trim().startsWith('<svg');
    
            switch(codeType) {
                case 'html':
                    codeElement.parentNode.parentNode.style.display = "none";
                    renderSmallWindow(codeElement);
                    break;
                case 'svg':
                case 'xml':
                    if (isSVGContent) {
                        renderInlineWithTabs(codeElement, "SVG Preview", (container) => {
                            container.innerHTML = codeElement.textContent;
                            container.style.display = "flex";
                            container.style.justifyContent = "center";
                            container.style.alignItems = "center";
                        });
                    }
                    break;
                case 'mermaid':
                     renderInlineWithTabs(codeElement, "Mermaid Diagram", (container) => {
                        const mermaidDiv = document.createElement("div");
                        mermaidDiv.className = "mermaid";
                        mermaidDiv.textContent = codeElement.textContent;
                        container.appendChild(mermaidDiv);
    
                        if (typeof mermaid === 'undefined') {
                            const script = document.createElement('script');
                            script.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
                            script.onload = () => {
                                mermaid.initialize({ startOnLoad: true });
                                mermaid.init(undefined, mermaidDiv);
                            };
                            document.head.appendChild(script);
                        } else {
                            mermaid.init(undefined, mermaidDiv);
                        }
                     });
                    break;
                case 'pptx':
                    renderInlineWithTabs(codeElement, "PowerPoint", (container) => {
                        renderPPTXContentInDiv(container, codeElement.textContent);
                    });
                    break;
            }
        });
    }
    
    function renderSmallWindow(codeElement) {
        const componentContainer = document.createElement("div");
        componentContainer.style.display = "flex";
        componentContainer.style.alignItems = "center";
        componentContainer.style.border = "1px solid #e5e7eb";
        componentContainer.style.borderRadius = "8px";
        componentContainer.style.padding = "10px";
        componentContainer.style.backgroundColor = "#f9fafb";
        componentContainer.style.marginBottom = "20px";
        componentContainer.style.cursor = "pointer";
        componentContainer.style.transition = "background-color 0.2s";
    
        componentContainer.onmouseover = () => componentContainer.style.backgroundColor = "#f3f4f6";
        componentContainer.onmouseout = () => componentContainer.style.backgroundColor = "#f9fafb";
    
        const iconContainer = document.createElement("div");
        iconContainer.style.borderRight = "1px solid #e5e7eb";
        iconContainer.style.paddingRight = "10px";
        iconContainer.innerHTML = `<svg style="height: 24px; width: 24px; color: #10a37f;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`;
    
        const textContainer = document.createElement("div");
        textContainer.style.marginLeft = "10px";
        const headerDiv = codeElement.parentNode.parentNode.children[0];
        const titleText = headerDiv ? headerDiv.innerText : "HTML App";
    
        textContainer.innerHTML = `
            <h3 style="margin:0; font-size:16px; font-weight:600; color:#374151;">${titleText}</h3>
            <p style="margin:0; font-size:13px; color:#6b7280;">点击打开侧边栏预览</p>
        `;
    
        componentContainer.appendChild(iconContainer);
        componentContainer.appendChild(textContainer);
    
        componentContainer.addEventListener("click", function () {
            const mainElement = document.querySelector("main");
    
            if (mainElement.style.display != "flex") {
                mainElement.style.display = "flex";
            }
    
            const sidebar = document.querySelector("body > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary.max-md\\:\\!w-0");
            if (sidebar && sidebar.style.width != "0px") {
                 const sidebarBtn = document.querySelector("body > div.relative.flex.h-full.w-full.overflow-hidden.transition-colors.z-0 > div.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary.max-md\\:\\!w-0 > div > div > div > nav > div.flex.justify-between.flex.h-\\[60px\\].items-center.md\\:h-header-height > span > button");
                if(sidebarBtn) sidebarBtn.click();
            }
    
            const iframe = document.getElementById("dynamicContentIframe");
            if(iframe) {
                iframe.style.display = "block";
                document.getElementById("codeContainer").style.display = "none";
                const btns = document.querySelectorAll(".maynor-toggle-btn");
                if(btns.length > 1) {
                    btns[0].classList.add("active");
                    btns[1].classList.remove("active");
                }
            }
    
            renderIframeContent(iframe, codeElement.textContent);
    
            // 填充代码容器
            const codeContainer = document.getElementById("codeContainer");
            codeContainer.innerHTML = "";
    
            // 复制整个代码块结构
            const clonedContent = codeElement.parentNode.parentNode.cloneNode(true);
            clonedContent.style.display = "block";
            codeContainer.appendChild(clonedContent);
    
            // --- 修复复制按钮 ---
            enableCopyButton(clonedContent, codeElement.textContent);
        });
    
        codeElement.parentNode.parentNode.insertAdjacentElement("beforebegin", componentContainer);
        return componentContainer;
    }
    
    function renderInlineWithTabs(codeElement, titleText, renderCallback) {
        const componentContainer = document.createElement("div");
        componentContainer.style.display = "flex";
        componentContainer.style.alignItems = "center";
        componentContainer.style.border = "1px solid #e5e7eb";
        componentContainer.style.borderRadius = "8px";
        componentContainer.style.padding = "10px";
        componentContainer.style.backgroundColor = "#f9fafb";
        componentContainer.style.marginBottom = "10px";
        componentContainer.style.marginTop = "10px";
        componentContainer.style.cursor = "pointer";
    
        componentContainer.innerHTML = `
            <div style="border-right: 1px solid #e5e7eb; padding-right: 10px;">
                <svg style="height: 24px; width: 24px; color: #6b7280;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div style="margin-left: 10px;">
                <h3 style="margin:0; font-size:16px; font-weight:600; color:#374151;">${titleText}</h3>
                <p style="margin:0; font-size:13px; color:#6b7280;">点击展开/收起预览</p>
            </div>
        `;
    
        const mainWrapper = document.createElement("div");
        mainWrapper.style.display = "none";
        mainWrapper.style.marginBottom = "20px";
    
        const tabsContainer = document.createElement("div");
        tabsContainer.className = "maynor-inline-tabs";
    
        const tabPreview = document.createElement("div");
        tabPreview.className = "maynor-inline-tab active";
        tabPreview.innerText = "预览";
    
        const tabCode = document.createElement("div");
        tabCode.className = "maynor-inline-tab";
        tabCode.innerText = "代码";
    
        tabsContainer.appendChild(tabPreview);
        tabsContainer.appendChild(tabCode);
    
        const contentArea = document.createElement("div");
        contentArea.className = "maynor-inline-content-wrapper";
    
        const previewPane = document.createElement("div");
        previewPane.style.padding = "20px";
        previewPane.style.backgroundColor = "#fff";
        previewPane.style.minHeight = "100px";
    
        const codePane = document.createElement("div");
        codePane.style.display = "none";
        codePane.style.padding = "0";
    
        // 复制并修复代码块
        const clonedCode = codeElement.parentNode.parentNode.cloneNode(true);
        clonedCode.style.display = "block";
        clonedCode.style.margin = "0";
    
        // --- 修复复制按钮 ---
        enableCopyButton(clonedCode, codeElement.textContent);
    
        codePane.appendChild(clonedCode);
    
        contentArea.appendChild(previewPane);
        contentArea.appendChild(codePane);
    
        mainWrapper.appendChild(tabsContainer);
        mainWrapper.appendChild(contentArea);
    
        tabPreview.onclick = (e) => {
            e.stopPropagation();
            tabPreview.classList.add("active");
            tabCode.classList.remove("active");
            previewPane.style.display = "block";
            codePane.style.display = "none";
        };
    
        tabCode.onclick = (e) => {
            e.stopPropagation();
            tabCode.classList.add("active");
            tabPreview.classList.remove("active");
            previewPane.style.display = "none";
            codePane.style.display = "block";
        };
    
        componentContainer.addEventListener("click", function() {
            const isHidden = mainWrapper.style.display === "none";
            mainWrapper.style.display = isHidden ? "block" : "none";
            if(isHidden) {
                if (renderCallback && !previewPane.hasChildNodes()) {
                    renderCallback(previewPane);
                }
            }
        });
    
        const parent = codeElement.parentNode.parentNode;
        parent.style.display = "none";
        parent.insertAdjacentElement("beforebegin", componentContainer);
        componentContainer.insertAdjacentElement("afterend", mainWrapper);
    }
    
    function renderIframeContent(iframe, content) {
        let nonce = "";
        try {
            if(typeof __remixContext !== 'undefined') {
                nonce = __remixContext.state.loaderData.root.cspScriptNonce;
            }
        } catch(e) {}
    
        if(nonce) {
            content = content.replace(/<script/g, `<script nonce="${nonce}"`);
        }
        iframe.srcdoc = content;
    }
    
    function renderPPTXContentInDiv(containerId, base64Content) {
        const uniqueId = "pptx-" + Math.random().toString(36).substr(2, 9);
        const div = document.createElement("div");
        div.id = uniqueId;
    
        if (containerId instanceof HTMLElement) {
            containerId.appendChild(div);
        }
    
        try {
            const byteCharacters = atob(base64Content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
    
             if (typeof jQuery === 'undefined') {
                const jqueryScript = document.createElement('script');
                jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
                jqueryScript.onload = () => loadPPTXJS(uniqueId, blob);
                document.head.appendChild(jqueryScript);
            } else {
                loadPPTXJS(uniqueId, blob);
            }
        } catch (error) {
            div.innerHTML = "PPTX 渲染错误";
        }
    }
    
    function loadPPTXJS(divId, blob) {
         const pptxjsScript = document.createElement('script');
        pptxjsScript.src = 'https://cdn.jsdelivr.net/gh/meshesha/pptxjs@latest/dist/pptxjs.min.js';
        pptxjsScript.onload = () => {
            const pptxjsCSS = document.createElement('link');
            pptxjsCSS.rel = 'stylesheet';
            pptxjsCSS.href = 'https://cdn.jsdelivr.net/gh/meshesha/pptxjs@latest/dist/pptxjs.min.css';
            document.head.appendChild(pptxjsCSS);
    
            $("#" + divId).pptxToHtml({
                pptxFileUrl: URL.createObjectURL(blob),
                slidesScale: "50%",
                slideMode: true,
                keyBoardShortCut: true
            });
        };
        document.head.appendChild(pptxjsScript);
    }
    
    function debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    
    

