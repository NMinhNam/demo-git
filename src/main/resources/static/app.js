const API_URL = 'http://localhost:9090/api/v1/students';

document.addEventListener('DOMContentLoaded', loadData);

function loadData() {
    axios
        .get(API_URL)
        .then((response) => {
            const studentList = response.data;

            const dataTable = document.getElementById('dataTable');
            dataTable.innerHTML = studentList
                .map(
                    (item) => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.studentId}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.phone}</td>
                    <td>${item.email}</td>
                    <td class="d-flex justify-content-center">
                        <button class="btn btn-secondary d-flex align-items-center me-2" style="height: 42px" 
                            onclick="openModal('${item.studentId}', '${item.name}', ${item.age}, '${item.phone}', '${item.email}')">
                        <span class="material-symbols-outlined">edit_square</span></button>
                        <button class="btn btn-danger d-flex align-items-center" style="height: 42px" 
                            onclick="deleteItem(${item.studentId})"><span class="material-symbols-outlined">delete</span></button>
                    </td>
                </tr>
            `
                )
                .join('');
        })
        .catch((error) => console.error('Error loading data', error));
}


function openModal(studentId = '', name = '', age = '', phone = '', email = '') {
    document.getElementById('studentId').value = studentId;
    const studentIdInput = document.getElementById('studentId');

    if (!studentIdInput.value.trim()) {
        studentIdInput.disabled = false;
    } else {
        studentIdInput.disabled = true;
    }

    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;
    document.getElementById('modalTitle').innerText = studentId ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên';
    new bootstrap.Modal(document.getElementById('crudModal')).show();
}

function closeModal() {
    const modalElement = document.getElementById('crudModal');
    const studentIdInput = document.getElementById('studentId');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // Reset input fields
    studentIdInput.value = '';
    nameInput.value = '';
    ageInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';

    // Remove validation styles and messages
    [studentIdInput, nameInput, ageInput, phoneInput, emailInput].forEach(input => {
        input.classList.remove('is-invalid');
        input.nextElementSibling.textContent = '';
    });
}

function saveItem() {
    const studentIdInput = document.getElementById('studentId');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    let isValid = true;

    // Reset validation states
    [studentIdInput, nameInput, ageInput, phoneInput, emailInput].forEach(input => {
        input.classList.remove('is-invalid');
        input.nextElementSibling.textContent = '';
    });

    // Validate Student ID
    if (!studentIdInput.value.trim()) {
        studentIdInput.classList.add('is-invalid');
        studentIdInput.nextElementSibling.textContent = 'Mã sinh viên không được để trống.';
        isValid = false;
    }

    // Validate Name
    if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        nameInput.nextElementSibling.textContent = 'Họ tên không được để trống.';
        isValid = false;
    }

    // Validate Age
    if (!ageInput.value.trim() || isNaN(ageInput.value) || ageInput.value < 1) {
        ageInput.classList.add('is-invalid');
        ageInput.nextElementSibling.textContent = 'Tuổi phải là số hợp lệ.';
        isValid = false;
    }

    // Validate Phone
    if (!phoneInput.value.trim() || !/^\d{10}$/.test(phoneInput.value)) {
        phoneInput.classList.add('is-invalid');
        phoneInput.nextElementSibling.textContent = 'Số điện thoại phải có 10 chữ số.';
        isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        emailInput.nextElementSibling.textContent = 'Email không hợp lệ.';
        isValid = false;
    }

    if (!isValid) return;

    const method = 'post';
    const url = API_URL;
    const data = {
        studentId: studentIdInput.value,
        name: nameInput.value,
        age: ageInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
    };

    axios[method](url, data)
        .then(() => {
            Swal.fire('Thành công', 'Dữ liệu đã được lưu', 'success');
            loadData();
            bootstrap.Modal.getInstance(document.getElementById('crudModal')).hide();
        })
        .catch(() => Swal.fire('Lỗi', 'Không thể lưu dữ liệu', 'error'));
}

function deleteItem(studentId) {
    Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: 'Dữ liệu sẽ bị xóa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`${API_URL}/${studentId}`)
                .then(() => {
                    Swal.fire('Đã xóa', 'Dữ liệu đã bị xóa', 'success');
                    loadData();
                })
                .catch(() => Swal.fire('Lỗi', 'Không thể xóa dữ liệu', 'error'));
        }
    });
}
