## TimeSheet gọi API từ JsonServer

## Chạy npx json-server --watch db.json --port 3004
 
### Time tracker
Xây dựng ứng dụng bằng ReactJS để theo dõi & tổng hợp timesheet


- Dũng React Create App để tạo dự án React.
- Sử dụng router để chuyển giữa các trang
- giữ được trạng thái đăng nhập (lưu local storage), dù có refresh trang hay đóng trang rồi mở lại thì trạng thái vẫn phải được giữ

### Mô tả
- Login: Khi vào ứng dụng, định hệ thống sẽ kiểm tra xem user đã đăng nhập chưa, nếu chưa thì hiển thị trang đăng nhập, nếu rồi thì chuyển đến trang timer-

- Timer
+ Người dùng có thể click vào chỗ có chữ `that are you working on?` để nhập mô tả task

+ Người dùng có thể click lên biểu tượng `tag` để chọn các tag có trong hệ thống.

+ Mặc định thời gian sẽ là 00:00:00, bấm vào nút Start bắt đầu, nút Stop dừng lại.

+ Bấm vào nút Start thì task ngay lập tức được tạo ra ở bên dưới.

+ Bấm xoá task thì hiển thị hộp thoại xác nhận, yes thì xoá khỏi hệ thống

+ Trang listting nhóm các task lại cùng ngyaf với nhau 

+ Mặc định hiển thị 5 nhóm ngày, bấm load more để tải thêm

+ Có thể chọn ngày cụ thể để xem các task

- Report:
+ Hiển thị biểu đồ, biểu diễn số giờ đã bỏ ra để làm các task.
+ Sử dụng [Donnut chart](https://wwa.chartjs.org/docs/next/charts/doughnut.html) để hiển thị tổng số giờ đã dùng chia theo % của từng tag (mỗi tag 1 màu)
+ Sử dụng [Barchart](https://www.chartjs-org/đocs/next/charts/bar.htm1#horizonta1-bar-chart) để hiển thị tổng số giờ đã dùng chia theo từng tag (mỗi tag 1 màu)
+ Cho phép người dùng lọc theo các tiêu chí:
  + Ngày hiện tại
  + Tuần hiện tại
  + Ngày hôm qua
  + Tuần trước
  + Tháng hiện tại
  + Tháng Trước
  + Tuỳ chọn ngày bắt đầu & kết thúc

### Kiến thức áp dụng

- Sử dụng React bootstra, styled

- Sử dụng các hàm cộng trừ/chuyển đổi ngày tháng. Tham khảo `momentjs`

- Thao tác đữ liệu dạng `CRUD` (Create - Read - Update - Delete) thông qua Restful APT

