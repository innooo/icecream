window.onload = function() {
    (function(document){
        var OcellDetailBack = document.querySelector('#JS_calendar_cellDetailBack');
        var Ocalendar_body = document.querySelector('#JS_calendar_body');
        var Opanel_menu = document.querySelector('#JS_panel_menu');
        var Opanel_mini = document.querySelector('#JS_panel_mini');
        var Opanel_close = document.querySelector('#JS_panel_close');
        var Ocalendar_table = document.querySelector('#JS_calendar_table');
        var OCellDetail = OcellDetailBack.parentNode;
        var Opanel_ul = document.querySelector('#JS_panel_ul');
        var Ocalendar_table_arrow = document.querySelector('#JS_calendar_table_arrow');
        var Ocalendar_day_bar = document.querySelector('#JS_calendar_day_bar');

        var activeCell, selectedCell;
        var renderFlag = 0; // 用于标识当前表格中需要渲染的是日期日历还是 年份 或是 月份 值为递增数值通过取余于3进行判断

        activeCell = renderFirstCal(); // 记录当前月份 用于渲染页面

        document.addEventListener('click', (e) => {
            var target = e.target;
            if(target.parentNode.id !== 'JS_panel_menu' &&target.id !== 'JS_panel_menu') {
              Opanel_ul.classList.add('unis');
            }
            if(target.tagName.toUpperCase() === 'TD') {
                selectedCell = {
                    year: target.dataset.year || '',
                    month: target.dataset.month || '',
                    date: target.dataset.date || '',
                    day: ''
                }
            }
            console.log(selectedCell);
        });
        // 操作面板菜单按钮
        Opanel_menu.addEventListener('click', (e) => {
            Opanel_ul.classList.remove('unis');
        });

        Opanel_ul.querySelectorAll('li')[0].addEventListener('click', (e) => {

        });
        Opanel_ul.querySelectorAll('li')[1].addEventListener('click', (e) => {
            
        });
        Opanel_ul.querySelectorAll('li')[2].addEventListener('click', (e) => {
            OCellDetail.classList.remove('unis');
        });
        // 操作面板最小按钮
    
        // 操作面板关闭按钮
    
        // 日期前进后退按钮
        Ocalendar_table_arrow.querySelectorAll('li')[0].addEventListener('click', (e) => { // 前进按钮
            var str = activeCell.year + '/' + activeCell.month;
            switch(renderFlag%3) {
                case 2: 
                    renderYearSelector(previousDozenYear(str));
                    break;
                case 1:
                    renderMonthSelector(previousMonth(str));
                    break;
                case 0:
                    renderCal(previousMonth(str));
                    break;
                default:
                    renderCal(previousMonth(str));
                    break;
            }
        });
        Ocalendar_table_arrow.querySelectorAll('li')[1].addEventListener('click', (e) => {
            var str = activeCell.year + '/' + activeCell.month;
            Ocalendar_day_bar.classList.add('unis'); // 隐藏星期
            if((renderFlag + 1)%3 == 2) {
                renderYearSelector(getFirstYearOnCal(str));
                renderFlag++;
            }
            if((renderFlag + 1)%3 == 1) {
                renderMonthSelector(str);
                renderFlag++;
            }
        });
        Ocalendar_table_arrow.querySelectorAll('li')[2].addEventListener('click', (e) => { // 后退按钮
            var str = activeCell.year + '/' + activeCell.month;
            switch(renderFlag%3) {
                case 2: 
                    renderYearSelector(nextDozenYear(str));
                    break;
                case 1:
                    renderMonthSelector(nextMonth(str));
                    break;
                case 0:
                    renderCal(nextMonth(str));
                    break;
                default:
                    renderCal(nextMonth(str));
                    break;
            }
        });
        // 详情页返回按钮
        OcellDetailBack.addEventListener('click', (e) => {
            e.target.parentNode.classList.add('unis');
        });

        Ocalendar_body.addEventListener('click', (e) => {
            if(e.target.tagName && e.target.tagName.toUpperCase() === 'TD') {
                var Ocalendar_date_cell = Ocalendar_table.querySelectorAll('td');
                Array.prototype.forEach.call(Ocalendar_date_cell, (node, index) => {
                    node.classList.remove('selected');
                });
                e.target.classList.add('selected');
            }
        });

        function previousDozenYear(str) {
            var year = getFirstYearOnCal(str) - 10;
            activeCell = {
                year: -(-year - 1),
                month: '',
                date: '',
                day: ''
            };
            return year;
        }

        function nextDozenYear(str) {
            var year = -(-getFirstYearOnCal(str) - 10);
            activeCell = {
                year: -(-year - 1),
                month: '',
                date: '',
                day: ''
            }
            return year;
        }

        function getFirstYearOnCal(str) { // 获取渲染在页面的第一年
            var year = str.split('/')[0]; // 年份
            var time = parseInt(year/10);
            return time * 10 - 1;
        }

        function previousMonth(str) { // 传入年/月的前一个月
            var year = str.split('/')[0];
            var month = str.split('/')[1];
            if(month - 1 <= 0) {
                activeCell = {
                    year: year -1,
                    month: '12',
                    date: '',
                    day: ''
                }
                return year - 1 + '/' + 12;
            }else {
                activeCell = {
                    year: year,
                    month: month -1,
                    date: '',
                    day: ''
                }
                return year + '/' + (month - 1);
            }
        }

        function nextMonth(str) { // 传入年月的后一个月
            var year = str.split('/')[0];
            var month = str.split('/')[1];
            if(-(-month - 1) >= 13) {
                activeCell = {
                    year: -(-year - 1),
                    month: 1,
                    date: '',
                    day: ''
                }
                return -(-year - 1) + '/' + 1;
            }else {
                activeCell = {
                    year: year,
                    month: -(-month -1),
                    date: '',
                    day: ''
                };
                return year + '/' + -(-month - 1);
            }
        }

        function previousDay(str) { // 传入日期的前一天
            var oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
            return new Date(new Date(str).getTime() - oneDay).toLocaleDateString();
        }

        function nextDay(str) { // 传入日期的后一天
            var oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
            return new Date(new Date(str).getTime() + oneDay).toLocaleDateString();
        }

        function floatDay(str, num) { // 传入日期的前几天
            var date = str;
            for(var i = 0; i < num; i++) {
                date = previousDay(date)
            }
            return date;
        }

        function getDay(str) { // 传入年/月或者年/月/日字符串，判断是星期几 周一到周日分别对应：１　－　７
            var time = new Date(str);
            var day = time.getDay();
            return day == 0 ? 7 : day;
        }

        function getFirstDayOnCal(str) { // 判断传入年/月在日历上第一个位置是哪一天 传入的必须是‘年/月’，不能包含日
            var day = getDay(str);
            return floatDay(str, day);
        }

        function renderYearSelector(calYear) { // 渲染年份/月份选择器 传入需要渲染到页面中的第一年
            var tr, td, txt, fragment = document.createDocumentFragment();
            Ocalendar_table_arrow.querySelectorAll('li')[1].innerHTML = -(-calYear - 1) + '-' + -(-calYear - 10);
            for(var i = 0; i < 3; i++) {
                tr = document.createElement('tr');
                for(var j = 0; j < 4; j++) {
                    if(!(i == 0 && j == 0)) {
                        calYear++;
                    }
                    td = document.createElement('td');
                    td.dataset.year = calYear;
                    txt = document.createTextNode(calYear);
                    td.appendChild(txt);
                    tr.appendChild(td);
                    fragment.appendChild(tr);
                }
            }
            
            Ocalendar_table.querySelector('tbody').innerHTML = '';
            Ocalendar_table.querySelector('tbody').appendChild(fragment);
        }

        function renderMonthSelector(str) {
            var monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ];            
            var tmp = 0;
            var tr, td, txt, fragment = document.createDocumentFragment();
            for(var i = 1; i <= 3; i++) {
                tr = document.createElement('tr');
                for(var j = 1; j <= 4; j++) {
                    tmp++;
                    td = document.createElement('td');
                    td.dataset.year = str.split('/')[0];
                    td.dataset.month = tmp;
                    txt = document.createTextNode(monthList[tmp - 1]);
                    td.appendChild(txt);
                    tr.appendChild(td);
                    fragment.appendChild(tr);
                }
            }
            Ocalendar_table_arrow.querySelectorAll('li')[1].innerHTML = str.split('/').join('-');
            Ocalendar_table.querySelector('tbody').innerHTML = '';
            Ocalendar_table.querySelector('tbody').appendChild(fragment);
        }

        function renderCal(str) { // 传入年/月
            var firstDay = getFirstDayOnCal(str);
            var year, month, date, day;
            var today = new Date();
            year = str.split('/')[0]; // 获取年份
            month = str.split('/')[1]; // 获取月份
            var fragment = document.createDocumentFragment();
            var tr, td, txt, theDay;
            for(var i = 0; i < 6; i++) {
                tr = document.createElement('tr');
                for(var j = 0; j < 7; j++){
                    if(i == 0 && j == 0) {
                        theDay = firstDay;
                    }else {
                        theDay = nextDay(theDay);
                    }
                    td = document.createElement('td');
                    td.dataset.year = year;
                    td.dataset.month = theDay.split('/')[1];
                    td.dataset.date = theDay.split('/')[2];

                    if(theDay.split('/')[1] === month) {
                        td.className = 'canlendar_table_cell_thisMonth';
                    }
                    
                    txt = document.createTextNode(new Date(theDay).getDate());
                    
                    if(today.getFullYear() == year && today.getMonth() == new Date(theDay).getMonth() && today.getDate() == new Date(theDay).getDate()) { // 如果是当天
                        td.classList.add('today');
                        date = new Date(theDay).getDate();
                        day = getDay(str + '/' + date);
                    }
                    td.appendChild(txt);
                    tr.appendChild(td);
                }
                fragment.appendChild(tr);
            }
            Ocalendar_table_arrow.querySelectorAll('li')[1].innerHTML = year + '年' + month + '月';
            Ocalendar_table.querySelector('tbody').innerHTML = '';
            Ocalendar_table.querySelector('tbody').appendChild(fragment);
            return {
                year: year,
                month: month,
                date: date || '',
                day: day || '',
            }
        }

        function renderFirstCal() { // 第一次渲染日历（当天）
            var time = new Date();
            var str = time.toLocaleDateString().split('/').slice(0, 2).join('/');
            return renderCal(str);
        }
    }(document))
};