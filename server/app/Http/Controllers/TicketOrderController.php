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

    public function store(Request $request)
    {
        $request->validate([
            'bill_id' => 'required|exists:bills,id',
            'code_seat' => 'required',
            'start_location' => 'required',
            'end_location' => 'required',
            'pay_location' => 'required',
        ]);

        $ticketOrder = new TicketOrder;
        $ticketOrder->code_ticket = Str::uuid();
        $ticketOrder->bill_id = $request->input('bill_id');
        $ticketOrder->code_seat = $request->input('code_seat');
        $ticketOrder->pickup_location = $request->input('start_location');
        $ticketOrder->pay_location = $request->input('pay_location');
        $ticketOrder->save();
        $newTicket = [$ticketOrder];

        if($request->round_trip == true) {
            $ticketOrderRound = new TicketOrder;
            $ticketOrderRound->code_ticket = Str::uuid();
            $ticketOrderRound->bill_id = $request->input('bill_id');
            $ticketOrderRound->code_seat = $request->input('code_seat');
            $ticketOrderRound->pay_location = $request->input('pay_location');
            $ticketOrderRound->pickup_location = $request->input('end_location');
            $ticketOrderRound->save();
            array_push($newTicket, $ticketOrderRound);
        }

        return response()->json($newTicket, 201);
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
}
?>
