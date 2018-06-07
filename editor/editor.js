window.onload = function() {
    (function(window, document) {
        let OrichTxtEditor = document.querySelector('#richTxtEditor'); // 富文本编辑器外壳
        
        let OedBTNList = document.querySelectorAll('.JS_edBTN'); // 按钮列表

        let btnListParms = [
            'bold|null|b',
            'italic|null|i',
            'underline|null|u'
        ];

        let statusMark = ['i']
        initEditor();
        
        /**
         * 方法区
         */

        function initEditor(container) {
            renderEditor(() => {
                let OoperatePanel = document.querySelector('#JS_editor_operate_main'); // 操作面板
                let Ocontent = document.querySelector('#ed_content'); // 可编辑区域
                let btnList = document.querySelectorAll('.JS_edBTN'); // 按钮列表
                bindRecallStatus(Ocontent, btnList);
                remainP(Ocontent);
                blurStoreRange(Ocontent);
                bindCommand(OoperatePanel);
            });
        }

        function bindRecallStatus(Ocontent, btnList) {
            Ocontent.onmousedown = function(e) {
                let selection = window.getSelection();
                selection.removeAllRanges(); // 在鼠标按下的时候清除selection
                document.onmouseup = Ocontent.ondbclick = function(e) {
                    recallStatus(e, window.getSelection().getRangeAt(0), btnList);
                };
            };
        }

        function recallStatus(e, range, btnList) {
            if(!range.collapsed && range.startOffset != range.endOffset) {
                let status = [];
                let start = range.startContainer.parentNode;
                let end = range.endContainer.parentNode;
                while(start.tagName.toUpperCase() != 'P') {
                    btnListParms.forEach((item, index) => {
                        if(item.split('|')[2] == start.tagName.toLowerCase()) {
                            status.push(item.split('|')[0]);
                        }
                    });
                    start = start.parentNode;
                }
                Array.prototype.forEach.call(btnList, (node, index) => {
                    let flag = false;
                    status.forEach((v, k) => {
                        if(node.firstElementChild.classList.contains('editor_operate_btn_icon_' + v)) {
                            node.classList.add('active');
                            flag = true;
                        }
                    });
                    if(!flag) {
                        node.classList.remove('active');
                    }
                });
            }
        }

        function renderEditor(cb) { // 渲染编辑器
            OrichTxtEditor.appendChild(renderOperatePanel(btnListParms));
            OrichTxtEditor.appendChild(renderEditorMain());
            cb();
        }

        function renderOperatePanel(btnListParms) { // 生成操作区
            var fragment = document.createDocumentFragment();
            var wrap = document.createElement('div');
            wrap.className = 'editor_operate_wrap';
            var main = document.createElement('div');
            main.className = 'editor_operate_main';
            main.id = 'JS_editor_operate_main';
            var btn, icon;
            if(Array.isArray(btnListParms)) {
                btnListParms.forEach((item, index) => {
                    btn = document.createElement('div');
                    btn.className = 'editor_operate_btn cr_pointer JS_edBTN';
                    btn.dataset.role = item.split('|')[0];
                    btn.dataset.parm = item.split('|')[1];
                    icon = document.createElement('div');
                    icon.className = 'editor_operate_btn_icon ' + 'editor_operate_btn_icon_' + item.split('|')[0];
                    icon.style.backgroundPosition = '';
                    btn.appendChild(icon);
                    main.appendChild(btn);
                });
            }
            wrap.appendChild(main);
            fragment.appendChild(wrap);
            return fragment;
        }

        function renderEditorMain() { // 生成编辑区
            var fragment = document.createDocumentFragment();
            var wrap = document.createElement('div');
            wrap.className = 'editor_content_wrap';
            var container = document.createElement('div');
            container.className = 'editor_content_container';
            var main = document.createElement('div');
            main.className = 'editor_content_main';
            main.id = 'ed_content';
            main.contentEditable = true;
            main.innerHTML = '<p><br/></p>';
            container.appendChild(main);
            wrap.appendChild(container);
            fragment.appendChild(wrap);
            return fragment;
        }

        function remainP(Ocontent) { // 每次删除完全部内容都需要添加p标签
            document.addEventListener('keyup', (e) => {
                if(e.keyCode === 46 || e.keyCode === 8) { // 删除
                    if(Ocontent.childElementCount == 0) {
                        Ocontent.innerHTML = '<p><br/></p>';
                    }
                }
            });
        }

        function blurStoreRange(Ocontent) { // 编辑区失去焦点存储range
            Ocontent.addEventListener('blur', () => { // 由于操作按钮是使用div模拟的，每次点击按钮回到值编辑区失去焦点， 所以要进行range对象存储
                backupRange(); // 也可以使用button 或者<a href="javascript:;"> 来作为按钮，这样就不会有这个问题
            });
        }

        function bindCommand(OoperatePanel) {
            OoperatePanel.addEventListener('click', (e) => {
                let target = e.target;
                let flag;
                if(target.parentNode.classList.contains('JS_edBTN')) {
                    restoreRange(); // 从存储的range中取得range
                    let role = target.parentNode.dataset.role;
                    let parm = target.parentNode.dataset.parm == 'null' ? null : target.parentNode.dataset.parm;
                    flag = document.execCommand(role, false, parm);
                    if(flag) {
                        target.parentNode.classList.toggle('active');
                    }
                    let range = window.getSelection().getRangeAt(0);
                }
            });
        }

        function resetRange(startContainer, startOffset, endContainer, endOffset) { // 重置range对象
            let selection = window.getSelection();
            selection.removeAllRanges();
            let range = document.createRange();
            range.setStart(startContainer, startOffset);
            range.setEnd(endContainer, endOffset);
            selection.addRange(range);
        }
        
        function backupRange() { // 备份ranges对象
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            this.currentSelection = {
                "startContainer": range.startContainer,
                "startOffset": range.startOffset,
                "endContainer": range.endContainer,
                "endOffset": range.endOffset
            }
        }
        
        function restoreRange() { // 取出备份的range对象
            if (this.currentSelection) {
                let selection = window.getSelection();
                selection.removeAllRanges();
                let range = document.createRange();
                range.setStart(this.currentSelection.startContainer, this.currentSelection.startOffset);
                range.setEnd(this.currentSelection.endContainer, this.currentSelection.endOffset);
                // 向选区中添加一个区域
                selection.addRange(range);
            }
        }
        
    })(window, document);
};