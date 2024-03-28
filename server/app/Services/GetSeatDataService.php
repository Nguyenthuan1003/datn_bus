<?php

namespace App\Services;

use App\Events\HoldSeatEvent;
use App\Models\Trip;
use Carbon\Carbon;

class GetSeatDataService
{
     public function rtGetSeatData()
     {
          // Get the current date
          $currentTime  = Carbon::now('Asia/Ho_Chi_Minh');
          // Format the start time as a string to match the database format
          $currentTime = $currentTime->toDateTimeLocalString();

          $tripQuery = Trip::where('status', 1)
               ->where('start_time', '>=', $currentTime)
               ->orderBy('route_id', 'desc')
               ->with(['car.typeCar' => function ($query) {
                    // Select the total_seat from the associated type_car relationship
                    $query->select('id', 'name', 'total_seat', 'type_seats');
               }])
               ->with(['bill' => function ($query) {
                    // Select the total_seat from the associated bill relationship
                    $query->select('trip_id', 'status_pay', 'total_seat as total_seat_used', 'seat_id as seat_code_used', 'created_at');
               }])
               ->get();

          $formatedData = [];

          $filteredTrips = $tripQuery->map(function ($trip) {
               $trip['total_seat'] = optional(optional($trip->car)->typeCar)->total_seat;
               $trip['total_seat_sold'] = collect($trip->bill
                    ->where('status_pay', 1))->sum('total_seat_used') ?? 0;
               $trip['total_seat_holding'] = collect($trip->bill
                    ->where('status_pay', 0)
                    ->where('created_at', '>=', now()->subMinutes(20))) // Compare with (now - 20 minutes)
                    ->sum('total_seat_used') ?? 0;
               $trip['total_seat_used'] =  $trip['total_seat_sold'] + $trip['total_seat_holding'] ?? 0;

               // Collect seat codes sold
               $seatCodesSold = $trip->bill
                    ->where('status_pay', 1)
                    ->pluck('seat_code_used')
                    ->flatten()
                    ->toArray();
               $seatCodesSold = array_map('json_decode', $seatCodesSold);
               $trip['array_seat_code_sold'] = collect($seatCodesSold)->flatten()->toArray();

               // Collect seat codes hold
               $seatCodesHold = $trip->bill
                    ->where('status_pay', 0)
                    ->pluck('seat_code_used')
                    ->flatten()
                    ->toArray();
               $seatCodesHold = array_map('json_decode', $seatCodesHold);
               $trip['array_seat_code_hold'] = collect($seatCodesHold)->flatten()->toArray();

               // Pluck 'seat_code_used' from each bill and flatten the array
               $seatCodes = collect($trip->bill)->pluck('seat_code_used')->flatten()->toArray();
               // Decode JSON strings to arrays
               $seatCodes = array_map('json_decode', $seatCodes);
               // Flatten again to merge all seat codes into a single array
               $trip['array_seat_code_used'] = collect($seatCodes)->flatten()->toArray();

               // Check if totalSeat and totalSeatUsed are not null before comparing
               if ($trip['total_seat'] !== null && $trip['total_seat_used'] !== null) {
                    // Calculate the available seats
                    $trip['total_seat_available'] =  $trip['total_seat'] - $trip['total_seat_used'];

                    return $trip;
               }
          })->filter();

          foreach ($filteredTrips as $trip) {
               $formatedData[] = [
                    // trip
                    "trip_id" => $trip->id,
                    "start_time" => $trip->start_time,
                    // seat
                    "total_seat" => $trip->total_seat,
                    "total_seat_used" => $trip->total_seat_used,
                    "total_seat_available" => $trip->total_seat_available,
                    "array_seat_code_sold" => $trip->array_seat_code_sold,
                    "array_seat_code_hold" => $trip->array_seat_code_hold,
                    "array_seat_code_used" => $trip->array_seat_code_used
               ];
          };

          HoldSeatEvent::dispatch($formatedData);

          return $formatedData;
     }
}
