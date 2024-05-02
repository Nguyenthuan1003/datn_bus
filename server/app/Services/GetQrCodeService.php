<?php

namespace App\Services;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Bill;
use App\Models\TicketOrder;

class GetQrCodeService
{
     public const SERVER_HOST = "172.20.10.7";

     public function createQrCode($billId)
     {
          $routeFindTicket = "http://" . $this::SERVER_HOST . ":3000/admin/check-ticket";
          $routeFindBill = "http://" . $this::SERVER_HOST . ":3000/admin/check-bill";

          try {
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

               // Return the tickets and bill data
               $data = [];
               $data['bill'] = $billData;
               $data['tickets'] = $tickets;

               return $data;
          } catch (\Exception $e) {
               return $e->getMessage();
          }
     }
}
