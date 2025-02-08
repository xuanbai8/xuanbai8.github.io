// 假设这是您的团队成员数据
const teamMembers = [
    { id: '1538393244', name: 'xuan8ai', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=1538393244&spec=640&img_type=jpg' },
    { id: '3064611047', name: '纸豪', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=3064611047&spec=640&img_type=jpg' },
    { id: '127719969', name: 'Translucent7', position: '宣传部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=127719969&spec=640&img_type=jpg' },
    { id: '2495027200', name: 'knight', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=2495027200&spec=640&img_type=jpg' },
    { id: '878274', name: 'K', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=878274&spec=640&img_type=jpg' },
        { id: '22253594', name: '月山橘', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=22253594&spec=640&img_type=jpg' },
            { id: '2038889633', name: '米', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=2038889633&spec=640&img_type=jpg' },
                { id: '2908690991', name: '魔魔', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=2908690991&spec=640&img_type=jpg' },
                    { id: '1687804195', name: '暮辞', position: '宣传部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=1687804195&spec=640&img_type=jpg' },
                        { id: '1704802092', name: '穗积', position: '技术部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=1704802092&spec=640&img_type=jpg' },
                            { id: '2378554212', name: '大白', position: '宣传部', photo: 'http://q.qlogo.cn/headimg_dl?dst_uin=2378554212&spec=640&img_type=jpg' },
    
];

// 手动设置开始时间为2024年7月17日0时0分0秒
const startTime = new Date('2024-07-17T04:00:00+08:00');

// 初始化页面上的信息盒子
function initBoxes() {
    const container = document.getElementById('boxesContainer');
    container.innerHTML = ''; // 清空容器
    teamMembers.forEach(member => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `
            <img src="${member.photo}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.position}</p>
        `;
        box.dataset.id = member.id; // 设置数据属性，方便筛选
        container.appendChild(box);
    });
}

// 筛选信息盒子
function filterBoxes() {
    const inputId = document.getElementById('searchBox').value.trim();
    const boxes = document.getElementById('boxesContainer');
    const noResult = document.getElementById('noResult');
    let found = false;

    boxes.querySelectorAll('.box').forEach(box => {
        if (box.dataset.id === inputId || inputId === '') {
            box.classList.remove('hidden');
            found = true;
        } else {
            box.classList.add('hidden');
        }
    });

    if (!found && inputId !== '') {
        noResult.classList.remove('hidden');
    } else {
        noResult.classList.add('hidden');
    }
}

// 计算运行时间，返回格式化的字符串
function getRuntimeString(startTime, currentTime) {
    const seconds = Math.floor((currentTime - startTime) / 1000); // 计算秒数
    const minutes = Math.floor(seconds / 60); // 计算分钟数
    const hours = Math.floor(minutes / 60); // 计算小时数
    const days = Math.floor(hours / 24); // 计算天数
    const years = Math.floor(days / 365); // 计算年数

    // 构建格式化的字符串
    let runtimeString = "";
    if (years > 0) runtimeString += `${years}年 `;
    if (days % 365 > 0) runtimeString += `${(days % 365)}天 `;
    if (hours % 24 > 0) runtimeString += `${(hours % 24)}小时 `;
    if (minutes % 60 > 0) runtimeString += `${(minutes % 60)}分钟 `;
    runtimeString += `${seconds % 60}秒`; // 秒数

    return runtimeString.trim(); // 去除末尾的空格
}

// 计算并显示网站已运行时长
function updateRuntime() {
    const startTime = new Date('2024-07-18T04:00:00+08:00'); // 手动设置的开始时间
    setInterval(() => {
        const currentTime = new Date(); // 获取当前时间
        const runtime = getRuntimeString(startTime, currentTime); // 计算运行时间
        document.getElementById('runtime').textContent = runtime; // 显示运行时间
    }, 1000); // 每秒更新一次
}

// 页面加载完成后初始化信息盒子
window.onload = function() {
    initBoxes();
    updateRuntime();
};