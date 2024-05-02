<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Orange Theme</title>
    <style>
        /* Reset CSS */
        body,
        h1,
        h2,
        p {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #ff8c00;
            color: #fff;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .booking-details {
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 20px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            background-color: #ff8c00;
            color: #fff;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            margin-top: 0px;
            color: #777;
            padding: 10px;
        }

        .py-3 {
            padding: 18px 0;
        }

        .p-0 {
            padding: 0;
        }

        .mb-1 {
            margin-bottom: 8px;
        }

        .color-text {
            color: #ff8c00;
        }

        .bill-qr-code {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ticket-qr-code {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
        }

        .ticket-item {
            padding: 3px;
        }

        .bill-qr-code>a>img,
        .ticket-item>a>img {
            width: 150px;
            height: 150px;
        }

        .ticket-item>a>img {
            padding: 5px 15px;
        }

        .logo-img {
            width: 200px;
            height: 200px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img class="logo-img" src="{{ asset('logo.png') }}" alt="" style="margin-left: 20px;">
        </div>

        <div class="content">
            <div class="booking-details">
                <h2>Xin chào, {{ strtoupper($userName) }}!</h2>
                <h4 class="mb-1">Cảm ơn bạn đã mua vé tại LETGO 5</h4>
                <p class="p-0">Bạn đã thanh toán thành công. Bên dưới là thông tin vé của bạn!</p>
                <p class="mb-1"><strong>Mã hóa đơn: </strong><b class="color-text">{{ $codeBill }}</b></p>
                <p><i>Qr code hóa đơn:</i></p>
                <div class="bill-qr-code">
                    <a href="{{ $getQrCodeData['bill']['bill_url'] }}">
                        <img src="{{ $getQrCodeData['bill']['qr_code_image'] }}" alt="bill-qrcode" />
                    </a>
                </div>
                <div class="py-3">
                    <p class="mb-1"><strong>Các mã vé đã mua ({{ count($codeTickets) }}): </strong></p>
                    <div class="ticket-qr-code">
                        <?php foreach ($codeTickets as $key => $ticket) : ?>
                        <div class="ticket-item">
                            <p>Mã vé: {{ $ticket }}</p>
                            <p><i>Qr code vé:</i></p>
                            <a href="{{ $getQrCodeData['tickets'][$key]['ticket_url'] }}">
                                <img src="{{ $getQrCodeData['tickets'][$key]['qr_code_image'] }}" alt="ticket-qrcode">
                            </a>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <p class="mb-1"><strong>Tuyến đường: </strong>
                        <b class="color-text">
                            {{ $startLocation }} {{ ' ⇒ ' }} {{ $endLocation }}
                        </b>
                    </p>
                    <p class="mb-1"><strong>Điểm đón: </strong><b class="color-text">{{ $pickUpLocation }}</b></p>
                    <p class="mb-1"><strong>Điểm trả: </strong><b class="color-text">{{ $payLocation }}</b></p>
                    <p class="mb-1"><strong>Thời gian đi: </strong>
                        <b class="color-text">
                            {{ \Carbon\Carbon::parse($startTime)->format('Y:m:d H:i:s') }}
                        </b>
                    </p>
                    <p class="mb-1"><strong>Vị trí ghế: </strong><b class="color-text">{{ $seats }}</b></p>
                </div>
            </div>
            <p class="mb-1"><b>Lưu ý:</b> Đây là thông tin cần được bảo mật, quý khách vui lòng không chia sẻ thông
                tin này cho bất kì ai để tránh việc mất vé.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 LETGO 5</p>
        </div>
    </div>
</body>

</html>
