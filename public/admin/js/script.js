const boxFilter = document.querySelector("[box-filter]");

if(boxFilter) {
    let url = new URL(location.href);

    boxFilter.addEventListener("change", () => {
        const value = boxFilter.value;

        if(value) {
            url.searchParams.set("status", value);
        } else {
            url.searchParams.delete("status");
        }

        location.href = url.href;
    })

    const statusCurrent = url.searchParams.get("status");
    if(statusCurrent) {
        boxFilter.value = statusCurrent;
    }
}

const formSearch = document.querySelector("[form-search]");
if(formSearch) {
    let url = new URL(location.href);

    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = formSearch.keyword.value;

        if(value) {
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }
        location.href = url.href;
    });

    const valueCurrent = url.searchParams.get("keyword");
    if(valueCurrent) {
        formSearch.keyword.value = valueCurrent;
    }
}

// Phân trang 
const listButtonPagination = document.querySelectorAll("[button-pagination]");

if(listButtonPagination.length > 0) {
    const url = new URL(location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            if(page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }

            location.href = url.href;
        })        
    })

    // Hiển thị trang mặc định 
    const pageCurrent = url.searchParams.get("page") || 1;
    const buttonCurrent = document.querySelector(`[button-pagination="${pageCurrent}"]`);

    if(buttonCurrent) {
        buttonCurrent.parentNode.classList.add("active");
    }
    //Hết Hiển thị trang mặc định 
}
// Hết Phân trang 

// Đổi trạng thái 
const listButtonChangStatus = document.querySelectorAll("[button-change-status]");

if(listButtonChangStatus.length > 0) {
    listButtonChangStatus.forEach(button => {
        button.addEventListener("click", () => {
            const idItem = button.getAttribute("id-item");
            const statusChange = button.getAttribute("button-change-status");
            const dataPatch = button.getAttribute("patch");
            
            const data = {
                id: idItem,
                status: statusChange
            };

            fetch(dataPatch, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.code == "success") {
                    location.reload();
                }
            })
        })
    })
}
//End Đổi trạng thái 

// Đổi trạng thái cho nhiều bản ghi 
const formChangMulti = document.querySelector("[form-change-multi]");
if(formChangMulti) {
    formChangMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const dataPatch = formChangMulti.getAttribute("data-path");
        const status = formChangMulti.status.value;
        if(status == "delete") {
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
            if(!isConfirm) {
              return;
            }
        }
        const ids = [];

        const listInputChangeChecked = document.querySelectorAll("[input-change]:checked");
        listInputChangeChecked.forEach(input => {
            const id = input.getAttribute("input-change");
            ids.push(id);
        })
        const data = {
            ids: ids,
            status : status
        };

        fetch(dataPatch , {
            headers: {
                "Content-Type" : "application/json",
            },
            method : "PATCH",
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.code == "success") {
                location.reload();
            }
        })
    })
}
//Hết Đổi trạng thái cho nhiều bản ghi 

// Xóa mềm các bản ghi 
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
    listButtonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa nó !");
            if(isConfirm) {
                const id = button.getAttribute("item-id");
                const path = button.getAttribute("data-path");

                fetch(path, {
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    method : "PATCH",
                    body : JSON.stringify({
                        id : id
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.code == "success") {
                        location.reload();
                    }
                })
            }
            
        })
    })
}
//Hết Xóa mềm các bản ghi

// Cập nhật vị trí 
const listInputPosition = document.querySelectorAll("[input-position]");
if(listInputPosition.length > 0) {
    listInputPosition.forEach(input => {
        input.addEventListener("change", () => {
            const id = input.getAttribute("item-id");
            const position = parseInt(input.value);
            const path = input.getAttribute("data-path");
            
            fetch(path, {
                headers: {
                    "Content-Type" : "application/json",
                },
                method : "PATCH",
                body : JSON.stringify({
                    id: id,
                    position : position
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.code == "success") {
                    location.reload();
                }
            })
        })
    })
}

//Hết Cập nhật vị trí 

// Thông báo cập nhật vị trí 
const alertMessage = document.querySelector("[alert-message]");
if(alertMessage) {
    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 3000);
}
//Hết Thông báo cập nhật vị trí 

// Hiển thị ảnh demo 
const inputUploadImage = document.querySelector("[upload-image-input]");
if(inputUploadImage) {
    inputUploadImage.addEventListener("change", () => {
        const uploadImagePreview = document.querySelector("[upload-image-preview]");
        const file = inputUploadImage.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
//Hết Hiển thị ảnh demo 

// Bộ lọc
const sortSelect = document.querySelector("[sort-select]");

if(sortSelect) {
    let url = new URL(location.href);

    sortSelect.addEventListener("change", () => {
        const value = sortSelect.value;

        if(value) {
            const [sortKey, sortValue] = value.split("-");
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
        } else {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
        }

        location.href = url.href;
    })

    const statusSortKey = url.searchParams.get("sortKey");
    const statusSortValue = url.searchParams.get("sortValue");
    if(statusSortKey && statusSortValue) {
        sortSelect.value = `${statusSortKey}-${statusSortValue}`;
    }
}
//Hết Bộ lọc

