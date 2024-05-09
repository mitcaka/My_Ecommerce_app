import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="main-box">
            <h4 className="payment-titlte">Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!</h4>
            <p>Nếu có bất kỳ câu hỏi nào, hãy gửi email tới <a href="mailto:nguyenmai202101@gmail.com">nguyenmai202101@gmail.com</a></p>
            <Link to="/dashboard/user/orders">Đến trang Orders</Link>
        </div>
    );
};

export default SuccessPage;
