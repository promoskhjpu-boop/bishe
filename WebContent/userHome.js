// 用户中心主逻辑
document.addEventListener('DOMContentLoaded', function() {
    console.log('用户中心页面加载');
    
    // 检查登录状态
    const username = localStorage.getItem('loginUsername');
    if (!username || username === 'null' || username === 'undefined') {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }
    
    // 设置用户名
    document.getElementById('usernameDisplay').textContent = '欢迎, ' + username;
    document.getElementById('usernameInput').value = username;
    
    // 初始化侧边栏
    initSidebar();
    
    // 加载用户数据
    loadUserProfile();
    
    // 自动加载快递数据（常驻显示）
    loadCourierData();  // 新增这行
});

// 初始化侧边栏
function initSidebar() {
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showSection(sectionId);
            
            // 更新active状态
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 显示指定部分
function showSection(sectionId) {
    console.log('显示部分:', sectionId);
    
    // 隐藏所有部分
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 显示目标部分
    document.getElementById(sectionId).style.display = 'block';
    
    // 如果是个人资料部分，确保快递信息也显示
    if (sectionId === 'profile') {
        // 快递信息已经在个人资料页面内，所以不需要额外处理
    }
    
    // 如果是地址部分，加载数据
    if (sectionId === 'address') {
        loadAddressData();
    }
}

// 加载快递数据
function loadCourierData() {
    const username = localStorage.getItem('loginUsername');
    console.log('为用户加载快递数据:', username);
    
    // 这里应该从后端API获取数据
    // fetch('/api/user/couriers?username=' + username)
    //   .then(response => response.json())
    //   .then(data => {
    //       renderCourierList(data);
    //   });
    
    // 暂时使用模拟数据
    const mockData = [
        { id: 1, trackingNumber: 'SF123456789', company: '顺丰速运', status: '运输中', estimatedDelivery: '2024-01-15' },
        { id: 2, trackingNumber: 'YT987654321', company: '圆通快递', status: '已送达', estimatedDelivery: '2024-01-10' },
        { id: 3, trackingNumber: 'ST555888999', company: '申通快递', status: '待发货', estimatedDelivery: '2024-01-20' }
    ];
    
    renderCourierList(mockData);
}

// 渲染快递列表
function renderCourierList(data) {
    const container = document.getElementById('courierList');
    if (!container) return;
    
    if (data.length === 0) {
        container.innerHTML = '<p>暂无快递信息</p>';
        return;
    }
    
    let html = '<table class="express-table"><thead><tr>';
    html += '<th>快递单号</th><th>快递公司</th><th>状态</th><th>预计送达</th><th>操作</th>';
    html += '</tr></thead><tbody>';
    
    data.forEach(item => {
        let statusClass = '';
        switch(item.status) {
            case '已送达': statusClass = 'status-delivered'; break;
            case '运输中': statusClass = 'status-shipping'; break;
            case '待发货': statusClass = 'status-pending'; break;
        }
        
        html += `
            <tr>
                <td>${item.trackingNumber}</td>
                <td>${item.company}</td>
                <td class="${statusClass}">${item.status}</td>
                <td>${item.estimatedDelivery}</td>
                <td>
                    <button class="btn-view" onclick="viewCourierDetail('${item.trackingNumber}')">查看详情</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// 查看快递详情
function viewCourierDetail(trackingNumber) {
    console.log('查看快递详情:', trackingNumber);
    alert('查看快递详情：' + trackingNumber);
    // 实际应用中应跳转到详情页面或显示详情弹窗
    // window.location.href = 'courierDetail.html?tracking=' + trackingNumber;
}

// 加载地址数据
function loadAddressData() {
    const username = localStorage.getItem('loginUsername');
    console.log('为用户加载地址数据:', username);
    
    // 这里应该从后端API获取数据
    // fetch('/api/user/addresses?username=' + username)
    //   .then(response => response.json())
    //   .then(data => {
    //       renderAddressList(data);
    //   });
    
    // 暂时使用模拟数据
    const mockAddresses = [
        { id: 1, recipient: '张三', phone: '13800138000', address: '北京市朝阳区建国路88号', isDefault: true },
        { id: 2, recipient: '张三', phone: '13800138001', address: '上海市浦东新区张江高科技园区', isDefault: false }
    ];
    
    renderAddressList(mockAddresses);
}

// 渲染地址列表
function renderAddressList(addresses) {
    const container = document.getElementById('addressList');
    if (!container) return;
    
    if (addresses.length === 0) {
        container.innerHTML = '<p>暂无收货地址</p><button onclick="addNewAddress()">添加地址</button>';
        return;
    }
    
    let html = '<div class="address-container">';
    
    addresses.forEach(addr => {
        const defaultBadge = addr.isDefault ? '<span class="default-badge">默认</span>' : '';
        
        html += `
            <div class="address-card">
                <div class="address-header">
                    <h4>${addr.recipient} ${defaultBadge}</h4>
                    <div class="address-actions">
                        <button onclick="setDefaultAddress(${addr.id})" ${addr.isDefault ? 'disabled' : ''}>设为默认</button>
                        <button onclick="editAddress(${addr.id})">编辑</button>
                        <button onclick="deleteAddress(${addr.id})">删除</button>
                    </div>
                </div>
                <div class="address-content">
                    <p><strong>电话：</strong>${addr.phone}</p>
                    <p><strong>地址：</strong>${addr.address}</p>
                </div>
            </div>
        `;
    });
    
    html += '<button onclick="addNewAddress()" style="margin-top: 20px;">添加新地址</button>';
    html += '</div>';
    
    container.innerHTML = html;
}

// 添加新地址
function addNewAddress() {
    const modal = createAddressModal();
    document.body.appendChild(modal);
}

// 创建地址编辑模态框
function createAddressModal(address = null) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const isEdit = !!address;
    const title = isEdit ? '编辑地址' : '添加新地址';
    
    modal.innerHTML = `
        <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; width: 500px;">
            <h3>${title}</h3>
            <form id="addressForm" onsubmit="saveAddress(event, ${isEdit ? address.id : 'null'})">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">收件人：</label>
                    <input type="text" name="recipient" value="${isEdit ? address.recipient : ''}" 
                           required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">电话：</label>
                    <input type="tel" name="phone" value="${isEdit ? address.phone : ''}" 
                           required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">地址：</label>
                    <textarea name="address" required rows="3" 
                              style="width: 100%; padding: 8px; box-sizing: border-box;">${isEdit ? address.address : ''}</textarea>
                </div>
                <div style="margin-bottom: 20px;">
                    <input type="checkbox" name="isDefault" id="isDefault" ${isEdit && address.isDefault ? 'checked' : ''}>
                    <label for="isDefault">设为默认地址</label>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button type="submit" style="flex: 1; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px;">保存</button>
                    <button type="button" onclick="closeModal(this)" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 5px;">取消</button>
                </div>
            </form>
        </div>
    `;
    
    return modal;
}

// 保存地址
function saveAddress(event, addressId = null) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const addressData = {
        id: addressId,
        recipient: formData.get('recipient'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        isDefault: formData.get('isDefault') === 'on'
    };
    
    console.log('保存地址数据:', addressData);
    
    // 这里应该发送数据到后端保存
    // fetch('/api/user/addresses', {
    //     method: addressId ? 'PUT' : 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(addressData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     closeModal(form);
    //     loadAddressData(); // 重新加载地址列表
    // });
    
    // 模拟成功
    alert('地址保存成功！');
    closeModal(form.closest('.modal-overlay'));
    
    // 如果是快递信息页面，重新加载数据
    if (document.getElementById('addressList')) {
        loadAddressData();
    }
}

// 设为默认地址
function setDefaultAddress(addressId) {
    if (confirm('确定要将此地址设为默认地址吗？')) {
        console.log('设为默认地址:', addressId);
        
        // 这里应该发送请求到后端
        // fetch('/api/user/addresses/default', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ addressId: addressId })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     loadAddressData(); // 重新加载地址列表
        // });
        
        alert('已设为默认地址！');
        loadAddressData();
    }
}

// 编辑地址
function editAddress(addressId) {
    console.log('编辑地址:', addressId);
    
    // 这里应该从后端获取地址详情
    // fetch('/api/user/addresses/' + addressId)
    //   .then(response => response.json())
    //   .then(address => {
    //       const modal = createAddressModal(address);
    //       document.body.appendChild(modal);
    //   });
    
    // 暂时使用模拟数据
    const mockAddress = {
        id: addressId,
        recipient: '张三',
        phone: '13800138000',
        address: '北京市朝阳区建国路88号',
        isDefault: true
    };
    
    const modal = createAddressModal(mockAddress);
    document.body.appendChild(modal);
}

// 删除地址
function deleteAddress(addressId) {
    if (confirm('确定要删除这个地址吗？')) {
        console.log('删除地址:', addressId);
        
        // 这里应该发送请求到后端
        // fetch('/api/user/addresses/' + addressId, {
        //     method: 'DELETE'
        // })
        // .then(response => response.json())
        // .then(data => {
        //     loadAddressData(); // 重新加载地址列表
        // });
        
        alert('地址已删除！');
        loadAddressData();
    }
}

// 关闭模态框
function closeModal(modalElement) {
    if (modalElement.closest) {
        const modal = modalElement.closest('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    } else if (modalElement.remove) {
        modalElement.remove();
    }
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        console.log('用户退出登录');
        
        // 清除所有存储的用户数据
        localStorage.removeItem('loginUsername');
        sessionStorage.clear();
        
        // 跳转到登录页面（HTML页面）
        window.location.href = 'login.html';
    }
}

// 初始化CSS样式
function initStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .express-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .express-table th, .express-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        .express-table th {
            background-color: #007bff;
            color: white;
        }
        
        .express-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .express-table tr:hover {
            background-color: #f1f1f1;
        }
        
        .status-delivered {
            color: #28a745;
            font-weight: bold;
        }
        
        .status-shipping {
            color: #ffc107;
            font-weight: bold;
        }
        
        .status-pending {
            color: #6c757d;
            font-weight: bold;
        }
        
        .btn-view {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .btn-view:hover {
            background-color: #0056b3;
        }
        
        .address-container {
            margin-top: 20px;
        }
        
        .address-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            background: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .address-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .address-actions {
            display: flex;
            gap: 10px;
        }
        
        .address-actions button {
            padding: 5px 10px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .address-actions button:hover {
            background: #f8f9fa;
        }
        
        .address-content p {
            margin: 5px 0;
        }
        
        .default-badge {
            background: #28a745;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            margin-left: 10px;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 500px;
            max-width: 90%;
        }
        
        .sidebar a.active {
            background-color: #007bff;
            color: white;
        }
    `;
    
    document.head.appendChild(style);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initStyles();
    checkLoginStatus();
    initSidebar();
});