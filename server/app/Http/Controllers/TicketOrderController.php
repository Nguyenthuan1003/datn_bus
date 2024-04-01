<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TicketOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TicketOrderController extends Controller
{
    public function index()
    {
        $ticketOrders = TicketOrder::with('bill', 'seat')->get();
        return response()->json($ticketOrders);
    }

    public function show($id)
    {
        $ticketOrder = TicketOrder::with('bill', 'seat')->find($id);

        if (!$ticketOrder) {
            return response()->json(['error' => 'Ticket Order not found'], 404);
        }

        return response()->json($ticketOrder);
    }

    public function destroy($id)
    {
        $ticketOrder = TicketOrder::find($id);

        if (!$ticketOrder) {
            return response()->json(['error' => 'Ticket Order not found'], 404);
        }

        $ticketOrder->delete();

        return response()->json(['message' => 'Ticket Order deleted']);
    }

    public function checkin(Request $request)
    {
        // Get the phone number from the request
        // $phoneNumber = $request->input('phone_number');

        // Get the code ticket from the request
        $codeTicket = $request->input('code_ticket');

        // Find the ticket order with the given code ticket
        $ticketOrder = TicketOrder::where('code_ticket', $codeTicket)->first();

        // Check if ticket order was found
        if ($ticketOrder) {
            // Get the associated bill
            // $bill = $ticketOrder->bill;

            // Check if the phone number matches
            // if ($bill && $bill->phone_number === $phoneNumber) {
                // Update the status of the ticket order
                // status 1 = chưa checkin, 0 = đã checkin
                $ticketOrder->update(['status' => 0]);

                return response()->json(['message' => 'Cập nhật thành công! (^__ ^ ")'], 200);
            // } else {
            //     return response()->json(['error' => 'Thông tin không tồn tại'], 404);
            // }
        } else {
            return response()->json(['error' => 'Thông tin không tồn tại'], 404);
        }
    }

    /**
     * Find all data for ticket
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function findTicket(Request $request)
    {
        try {
            $request->validate([
                'phone_number' => 'required',
                'code_ticket' => 'required|string'
            ]);

            $ticket = TicketOrder::join('bills', 'ticket_orders.bill_id', '=', 'bills.id')
                ->join('trips', 'bills.trip_id', '=', 'trips.id')
                ->join('routes', 'trips.route_id', '=', 'routes.id')
                ->join('cars', 'trips.car_id', '=', 'cars.id')
//                ->select('bills.phone_number', 'bills.status_pay', 'ticket_orders.code_ticket', 'routes.name as route_name', 'trips.start_time', 'cars.license_plate', 'ticket_orders.code_seat', 'bills.total_money_after_discount', 'bills.total_seat', 'ticket_orders.pickup_location', 'ticket_orders.pay_location')
                ->select('bills.phone_number', 'bills.full_name', 'bills.email', 'bills.status_pay', 'ticket_orders.status' , 'ticket_orders.code_ticket', 'routes.name as route_name', 'trips.start_time', 'cars.license_plate', 'ticket_orders.code_seat', 'ticket_orders.pickup_location', 'ticket_orders.pay_location')
                ->selectRaw('bills.total_money_after_discount / bills.total_seat as ticket_money')
                ->where('ticket_orders.code_ticket', $request->input('code_ticket'))
                ->where('bills.phone_number', $request->input('phone_number'))
                ->first();

            if (!$ticket) {
                return response()->json([
                    'message' => 'Vé này không tồn tại hoặc không hợp lệ',
                    'status' => 'fail'
                ]);
            }

            return response()->json([
                'message' => 'Truy vấn dữ liệu thành công',
                'status' => 'success',
                'ticket' => $ticket
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xử lý dữ liệu',
                'status' => 'fail',
//                'error' => $e->getMessage()
            ]);
        }
    }
}
