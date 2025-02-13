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
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('phone').value = phone;
    document.getElementById('email').value = email;
    document.getElementById('modalTitle').innerText = studentId ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên';
    new bootstrap.Modal(document.getElementById('crudModal')).show();
}

function saveItem() {
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!studentId || !name || !age || !phone || !email) {
        Swal.fire('Lỗi', 'Tất cả các trường đều bắt buộc', 'error');
        return;
    }

    const method = 'post';
    const url = API_URL;
    const data = {studentId, name, age, phone, email};

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
