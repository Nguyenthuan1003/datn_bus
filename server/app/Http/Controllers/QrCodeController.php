<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\TicketOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QrCodeController extends Controller
{
    public function generateQRCode(Request $request)
    {
        try {
            // $routeFindTicket = Route::has('find-ticket-to-checkin') ? Route('find-ticket-to-checkin') : "";
            $routeFindTicket = "http://192.168.1.16:3000/admin/check-ticket";
            $routeFindBill = "http://192.168.1.16:3000/admin/check-bill";

            $billId = $request->bill_id;
            $bill = Bill::where('id', $billId)->first();

            // Fetch all tickets by bill_id
            $tickets = TicketOrder::where('bill_id', $billId)
                ->orderByDesc('status')
                ->get();

            // create qr code for each ticket
            // qr data
            $pathToSaveQrCode = public_path('storage\images\qrcode');
            $fileFormat = ".svg";
            foreach ($tickets as $ticket) {
                $checkinUrl = $routeFindTicket . "?phone_number=" . $bill->phone_number . "&code_ticket=" . $ticket->code_ticket;
                $ticket['ticket_url'] = $checkinUrl;

                // qr image
                $qrData = $checkinUrl;
                $fileName = time() . $ticket->code_ticket . $ticket->code_seat . '_qrcode' . $fileFormat;
                $filePath = $pathToSaveQrCode . "\\" . $fileName;

                // Generate QR code for each ticket
                QrCode::size(400)->generate($qrData, $filePath);

                // Return QR code image URL
                $ticket['qr_code_image'] = asset('storage/images/qrcode/' . $fileName);
            }

            // Generate QR code for bill
            $qrData = $routeFindBill . "?phone_number=" . $bill->phone_number . "&code_bill=" . $bill->code_bill;
            $fileName = time() . $bill->code_bill . '_qrcode' . $fileFormat;
            $filePath = $pathToSaveQrCode . "\\" . $fileName;
            QrCode::size(400)->generate($qrData, $filePath);
            $qrCodeImageBill =  asset('storage/images/qrcode/' . $fileName);
            $billData = [];
            $billData['bill_url'] = $qrData;
            $billData['qr_code_image'] = $qrCodeImageBill;

            // Return the tickets as JSON response
            return response()->json(
                [
                    'message' => 'Truy vấn thành công',
                    'data' => [
                        'bill' => $billData,
                        'tickets' => $tickets
                    ]
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['message' => 'Truy vấn thất bại', 'error' => $e->getMessage()], 400);
        }
    }
}
