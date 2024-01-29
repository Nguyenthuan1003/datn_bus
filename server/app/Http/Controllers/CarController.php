<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('type_cars')
            ->select('id','name', 'color', 'image', 'description','license_plate','status', 'id_type_car')
            ->get();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'color' => 'nullable|string',
            'description' => 'nullable|string',
            'license_plate' => 'required|string',
            'status' => 'required|string',
            'id_type_car' => 'required|integer|exists:id_type_car',
        ]);

        $car = new Location();
        $car->name = $request->input('name');
        $car->color = $request->input('color');
        $car->description = $request->input('description');
        $car->license_plate = $request->input('license_plate');
        $car->license_plate = $request->input('license_plate');
        $car->status = $request->input('status');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'public');
            $car->image = $imagePath;
        }
        $car->save();

        return response()->json($car, 201);
    }

    public function show($id)
    {
        $car = Location::with('type_cars')
            ->select('id','name', 'color', 'image', 'description','license_plate','status', 'id_type_car')
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
            'image' => 'nullable|string',
            'color' => 'nullable|string',
            'description' => 'nullable|string',
            'license_plate' => 'required|string',
            'status' => 'required|string',
            'id_type_car' => 'required|integer|exists:id_type_car',
        ]);

        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->name = $request->input('name');
        $car->color = $request->input('color');
        $car->description = $request->input('description');
        $car->license_plate = $request->input('license_plate');
        $car->license_plate = $request->input('license_plate');
        $car->status = $request->input('status');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images', 'public');
            $car->image = $imagePath;
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