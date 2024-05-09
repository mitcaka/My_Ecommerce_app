import React from 'react';
import { Link } from 'react-router-dom';
const FailurePage = () => {
    return (
        <div className="main-box">
            <h4 className="payment-titlte">Thanh toán thất bại</h4>
            <p>Nếu có bất kỳ câu hỏi nào, hãy gửi email tới <a href="mailto:support@payos.vn">support@payos.vn</a></p>
            <Link to="/cart">Trở về trang giỏ hàng</Link>
        </div>
    );
};

export default FailurePage;
