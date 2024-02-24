<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SeatController extends Controller
{
    public function index()
    {
        $seats = Seat::with('car', 'bills', 'ticketOrders')->get();
        return response()->json(['seats' => $seats]);
    }

    public function show($id)
    {
        $seat = Seat::with('car', 'bills', 'ticketOrders')->find($id);

        if (!$seat) {
            return response()->json(['error' => 'Seat not found'], 404);
        }

        return response()->json(['seat' => $seat]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'code_seat' => 'required|string',
        ]);

        $seat = Seat::create($data);

        return response()->json(['seat' => $seat], 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'code_seat' => ['required', 'string', Rule::unique('seats')->ignore($id)],
        ]);

        $seat = Seat::find($id);

        if (!$seat) {
            return response()->json(['error' => 'Seat not found'], 404);
        }

        $seat->update($data);

        return response()->json(['seat' => $seat]);
    }

    public function destroy($id)
    {
        $seat = Seat::find($id);

        if (!$seat) {
            return response()->json(['error' => 'Seat not found'], 404);
        }

        $seat->delete();

        return response()->json(['message' => 'Seat deleted successfully']);
    }
}
