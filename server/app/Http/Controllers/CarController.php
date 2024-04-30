<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Seat;
use App\Models\TypeCar;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('typeCar')
            ->select('id', 'name', 'color', 'image', 'description', 'license_plate', 'status', 'id_type_car')
            ->get();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5048',
            'color' => 'nullable|string',
            'description' => 'string',
            'license_plate' => 'required|string',
            'status' => 'required',
            'id_type_car' => 'required|integer|exists:type_cars,id',
        ]);

        $car = new Car();
        $car->name = $request->input('name');
        $car->color = $request->input('color');
        $car->description = $request->input('description');
        $car->id_type_car = $request->input('id_type_car');
        $car->license_plate = $request->input('license_plate');
        $car->status = $request->input('status');

        $imageTruePath = "";
        if ($request->hasFile('image')) {
            $saveImageTo = 'images/car';
            $image = $request->file('image');

            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs($saveImageTo, $imageName, 'public');
            $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
        }
        $car->image = $imageTruePath;

        $car = collect($car)->toArray();

        $carId = Car::insertGetId($car);

        $query = Car::where('id', $carId)
            ->with('TypeCar')
            ->first();

        $typeSeat =  $query->typeCar->type_seats;
        $totalSeat = $query->typeCar->total_seat;
        $upFloorAt = 18;

        $seatRecord = [
            "car_id" => $carId,
        ];

        $seatCodeCount = 1;
        for ($j = 0; $j < $totalSeat; $j++) {
            // Check if typeSeat is greater than 1 and if loop counter is greater than or equal to upFloorAt
            if ($typeSeat > 1 && $j >= $upFloorAt) {
                // Reset seat code count to 1 when reaching "F2"
                if ($seatCodeCount > $upFloorAt) {
                    $seatCodeCount = 1;
                }
                // If the condition is met, set the seat code to "Fn"
                $seatRecord['code_seat'] = "F2-" . $seatCodeCount;
            } else {
                // Otherwise, set the seat code to "F1"
                $seatRecord['code_seat'] = "F1-" . $seatCodeCount;
            }
            // Increment seat code count
            $seatCodeCount++;

            Seat::insert($seatRecord);
        }

        return response()->json($query, 201);
    }

    public function show($id)
    {
        $car = Car::with('typeCar')
            ->select('id', 'name', 'color', 'image', 'description', 'license_plate', 'status', 'id_type_car')
            ->find($id);

        if (!$car) {
            return response()->json(['message' => 'car not found'], 404);
        }

        return response()->json($car);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable',
            'color' => 'nullable|string',
            'description' => 'nullable|string',
            'license_plate' => 'required|string',
            'status' => 'required',
            'id_type_car' => 'required|integer|exists:type_cars,id',
        ]);

        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->name = $request->input('name');
        $car->color = $request->input('color');
        $car->description = $request->input('description');
        $car->id_type_car = $request->input('id_type_car');
        $car->license_plate = $request->input('license_plate');
        $car->status = $request->input('status');

        if ($request->hasFile('image')) {
            $saveImageTo = 'images/car';
            $image = $request->file('image');

            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs($saveImageTo, $imageName, 'public');
            $imageTruePath = substr(Storage::url($saveImageTo . '/' . $imageName), 1);
            $car->image = $imageTruePath;
        }

        $car->save();

        return response()->json($car);
    }

    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->delete();

        return response()->json(['message' => 'Car deleted successfully']);
    }
}
