<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    public function searchTrip(Request $request)
    {
        $startLocation = $request->input('start_location');
        $endLocation = $request->input('end_location');
        $startDate = $request->input('start_date');
        $startTime = $request->input('start_time');
        $ticketCount = $request->input('ticket_count');

        $matchingTrips = Trip::where('start_location', 'like', $startLocation . '%')
            ->where('end_location', 'like', $endLocation . '%')
            ->where('start_date', 'like', $startDate . '%')
            ->where('start_time', 'like', $startTime . '%')
            ->get();

        if (
            $matchingTrips->count() < $ticketCount ||
            !$matchingTrips->count()
        ) {
            return response()->json([
                'error' => 'Lỗi tìm kiếm'
            ], 404);
        }

        return response()->json([
            'message' => $matchingTrips,
        ], 200);
    }
}
