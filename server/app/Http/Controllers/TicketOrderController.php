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
}
?>
