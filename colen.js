document.addEventListener('DOMContentLoaded', () => {
  const popupContainer = document.getElementById('popupContainer');
  const closePopupButton = document.getElementById('closePopup');
  const introVideo = document.getElementById('introVideo');

  setTimeout(() => {
    popupContainer.style.display = 'flex'; // Hiển thị popup
    introVideo.play(); // Bắt đầu phát video
  }, 3000); // Sau 3 giây

  closePopupButton.addEventListener('click', () => {
    popupContainer.style.display = 'none'; // Ẩn popup
    introVideo.pause(); // Dừng phát video
  });
});

/*Dùng dropdown cho bộ lọc*/

document.getElementById('dropdown-btn').addEventListener('click', function () {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });
  
  document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
      document.getElementById('dropdown-content').style.display = 'none';
    }
  });
  /*Chạy dropdown*/
// Tìm nút and nội dung dropdown
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownContent = document.getElementById('dropdown-content');
const radioButtons = document.querySelectorAll('.dropdown-item input');
// Thả danh mục xuống khi ấn nút
dropdownBtn.addEventListener('click', () => {
  dropdownContent.parentElement.classList.toggle('show');
});

// Cập nhật nút khi ấn
radioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    dropdownBtn.textContent = `Bộ lọc - ${selectedValue}`;
    dropdownContent.parentElement.classList.remove('show'); 
  });
});

// Đóng dropdown
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    dropdownContent.parentElement.classList.remove('show');
  }
});

/*Phân trang sản phẩm*/
document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll('.product');
  const pageButtons = document.querySelectorAll('.page-btn');
  const productsPerPage = 12; // Số lượng sản phẩm trên 1 trang
  let currentPage = 1; //Trang hiện tại
  const totalPages = Math.ceil(products.length / productsPerPage); //Tính tổng số lượng page

  function showPage(page) {
    const startIndex = (page - 1) * productsPerPage;//Vị trí bắt đầu của sản phẩm trên trang
    const endIndex = startIndex + productsPerPage;// Vị trí kết thúc của sản phẩm

    // Hiện thị sản phẩm trên trang
    products.forEach((product, index) => {
      product.style.display = index >= startIndex && index < endIndex ? 'block' : 'none';
    });

    // Cập nhật trạng thái của nút
    pageButtons.forEach(button => button.classList.remove('active'));//Xóa
    document.querySelector(`.page-btn[data-page="${page}"]`)?.classList.add('active');//Gắn trạng thái cho nút

    // kích hoạt/ vô hiệu hóa nút
    document.querySelector('.page-btn[data-page="prev"]').disabled = page === 1;//Vô hiệu hóa prev nếu ở trang 1
    document.querySelector('.page-btn[data-page="next"]').disabled = page === totalPages;//Vô hiệu hóa next nếu ở trang cuối
  }

  // Cập nhật nội dung nút
  document.querySelector('.pagination').addEventListener('click', event => {
    const button = event.target;//Nút được nhấn
    if (button.classList.contains('page-btn')) { //Nếu nút thuộc page-btn
      const page = button.dataset.page;//Lấy số trang từ thuộc tính data-page

      if (page === 'prev' && currentPage > 1) {
        currentPage--;//Giảm trang khi ấn 
      } else if (page === 'next' && currentPage < totalPages) {
        currentPage++;//Tăng trang khi ấn
      } else if (!isNaN(page)) {//Nếu là số trang cụ thể
        currentPage = parseInt(page);//Chuyển đổi thành số nguyên
      }

      showPage(currentPage);//Hiển thị nội dung trang mới
    }
  });

  // Hiển thị nội dung trang đầu tiên
  showPage(1);
});