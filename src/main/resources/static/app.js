const API_URL = 'http://localhost:9090/api/v1/students';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: { popup: 'colored-toast' },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    try {
        const { data: students } = await axios.get(API_URL);
        document.getElementById('dataTable').innerHTML = students.map(studentTemplate).join('');
    } catch {
        showToast('error', 'Lỗi! Không thể tải dữ liệu');
    }
}

function studentTemplate({ id, studentId, name, age, phone, email }) {
    return `
        <tr>
            <td>${id}</td>
            <td>${studentId}</td>
            <td>${name}</td>
            <td>${age}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td class="d-flex justify-content-center">
                <button class="btn btn-secondary d-flex align-items-center me-2" style="height: 42px"
                    onclick="openModal('${studentId}', '${name}', ${age}, '${phone}', '${email}')">
                    <span class="material-symbols-outlined">edit_square</span>
                </button>
                <button class="btn btn-danger d-flex align-items-center" style="height: 42px"
                    onclick="deleteItem('${studentId}')">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>`;
}

function openModal(studentId = '', name = '', age = '', phone = '', email = '') {
    const modal = document.getElementById('crudModal');

    setInputValue('studentId', studentId, studentId.trim() !== '');
    setInputValue('name', name);
    setInputValue('age', age);
    setInputValue('phone', phone);
    setInputValue('email', email);

    document.getElementById('modalTitle').innerText = studentId ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên';
    new bootstrap.Modal(modal).show();
}

function setInputValue(id, value, disabled = false) {
    const input = document.getElementById(id);
    input.value = value;
    input.disabled = disabled;
}

function closeModal() {
    ['studentId', 'name', 'age', 'phone', 'email'].forEach(resetInput);
}

function resetInput(id) {
    const input = document.getElementById(id);
    input.value = '';
    input.classList.remove('is-invalid');
    input.nextElementSibling.textContent = '';
}

function validateInputs() {
    const rules = {
        studentId: v => v.trim() !== '' || 'Mã sinh viên không được để trống.',
        name: v => v.trim() !== '' || 'Tên không được để trống.',
        age: v => (v.trim() && !isNaN(v) && v > 0) || 'Tuổi phải là số hợp lệ.',
        phone: v => /^\d{10}$/.test(v) || 'Số điện thoại phải có 10 chữ số.',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email không hợp lệ.'
    };

    let isValid = true;
    for (const [id, check] of Object.entries(rules)) {
        const input = document.getElementById(id);
        const errorMsg = check(input.value);
        input.classList.toggle('is-invalid', errorMsg !== true);
        input.nextElementSibling.textContent = errorMsg === true ? '' : errorMsg;
        if (errorMsg !== true) isValid = false;
    }
    return isValid;
}

async function saveItem() {
    if (!validateInputs()) return;

    const data = Object.fromEntries(
        ['studentId', 'name', 'age', 'phone', 'email'].map(id => [id, document.getElementById(id).value])
    );

    try {
        await axios.post(API_URL, data);
        showToast('success', 'Lưu thành công!');
        loadData();
        bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
    } catch {
        showToast('error', 'Lỗi! Không thể lưu dữ liệu');
    }
}

async function deleteItem(studentId) {
    const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
    });

    if (!result.isConfirmed) return;

    try {
        await axios.delete(`${API_URL}/${studentId}`);
        showToast('success', 'Xóa thành công!');
        loadData();
    } catch {
        showToast('error', 'Lỗi! Không thể xóa dữ liệu');
    }
}

function showToast(icon, message) {
    Toast.fire({ icon, title: message });
}
