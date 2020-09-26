import { getListProductService, deleteProductByID, addProduct, getProductByID, updateProduct, callapi } from "./utils/callApi.js";
import Product from "./model/product.js";

const renderHTML = () => {
    const contentHTML = `
    <div class="card text-white bg-dark">
    <div class="card-body">
        <h4 class="card-title">Danh sách sản phẩm</h4>
        <div class='container'>
            <div class="row">
                <div class="col-md-3">
                    <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
                </div>
                <div class="col-md-3">
                    <input id="tenSP" class="form-control" placeholder="Tên SP" />
                </div>
                <div class="col-md-3">
                    <input id="gia" class="form-control" placeholder="Giá" />
                </div>
                <div class="col-md-3">
                    <input id="hinhAnh" class="form-control" placeholder="Link hình" />
                </div>
            </div>
            <br />
            <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
            <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
        </div>
    </div>
  </div>
  <div class="container">
      <table class="table">
          <thead>
              <tr>
                  <th>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Giá </th>
                  <th>Hình ảnh</th>
                  <th></th>
              </tr>
          </thead>
          <tbody id="tblDanhSachSanPham">
  
          </tbody>
      </table>
  </div>
  `;
    document.getElementById("root").innerHTML = contentHTML
};
const renderListProduct = () => {
    callapi("SanPham", "GET", null)
        .then((result) => {
            // console.log(result.data);
            const contentTbody = renderTable(result.data);
            document.getElementById("tblDanhSachSanPham").innerHTML = contentTbody;

        })
        .catch((err) => {
            console.log(err);
        })
};

renderHTML();
renderListProduct();

const renderTable = (listSanPham) => {
    if (listSanPham && listSanPham.length > 0) {
        let contentHTML = "";
        listSanPham.map((product) => {
            contentHTML += `
            <tr>
              <td>${product.id}</td>
              <td>${product.tenSP}</td>
              <td>${product.gia}</td>
              <td>
              <img src="${product.hinhAnh}" width="50"/>
              </td>
              <td>
                <button class="btn btn-success" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
              </td>
            </tr>
          `;
        });
        return contentHTML;
    }
};
/**
 * Delete product
 */

window.deleteProduct = deleteProduct;
// console.log(window);

function deleteProduct(id) {
    callapi(`SanPham/${id}`, "DELETE", null)
        .then((result) => {
            alert("Delete success!");
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
};
/**
 * Them
 */
document.getElementById("btnThem").addEventListener("click", function() {
    let hinhAnh = document.getElementById("hinhAnh").value;
    let tenSP = document.getElementById("tenSP").value;
    let gia = document.getElementById("gia").value;

    const product = new Product("", tenSP, gia, hinhAnh);
    console.log(product);
    callapi(`SanPham`, "POST", product)
        .then(() => {
            alert("add success");
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
});
/**
 * edit
 */
window.editProduct = editProduct;

function editProduct(id) {
    callapi(`SanPham/${id}`, "GET", null)
        .then((resutl) => {
            console.log(resutl.data);
            document.getElementById("maSP").value = resutl.data.id;
            document.getElementById("hinhAnh").value = resutl.data.hinhAnh;
            document.getElementById("tenSP").value = resutl.data.tenSP;
            document.getElementById("gia").value = resutl.data.gia;

        })
        .catch((err) => {
            console.log(err);
        })
}
document.getElementById("btnCapNhat").addEventListener("click", function() {
    let id = document.getElementById("maSP").value;
    let hinhAnh = document.getElementById("hinhAnh").value;
    let tenSP = document.getElementById("tenSP").value;
    let gia = document.getElementById("gia").value;
    const product = new Product(id, tenSP, gia, hinhAnh);
    callapi(`SanPham/${id}`, "PUT", product)
        .then(() => {
            alert("update success");
            renderListProduct();
        })
        .catch((err) => {
            console.log(err);
        })
});