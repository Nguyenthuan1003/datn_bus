<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with('parentLocation')
            ->select('id', 'name', 'image', 'description', 'parent_location_id')
            ->get();
        dd($locations);
        return response()->json($locations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'parent_location_id' => 'required|integer|exists:parent_locations,id',
        ]);

        $location = new Location();
        $location->name = $request->input('name');
        $location->image = $request->input('image');
        $location->description = $request->input('description');
        $location->parent_location_id = $request->input('parent_location_id');
        $location->save();

        return response()->json($location, 201);
    }

    public function show($id)
    {
        $location = Location::with('parentLocation')
            ->select('id', 'name', 'image', 'description', 'parent_location_id')
            ->find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        return response()->json($location);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'parent_location_id' => 'required|integer|exists:parent_locations,id',
        ]);

        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->name = $request->input('name');
        $location->image = $request->input('image');
        $location->description = $request->input('description');
        $location->parent_location_id = $request->input('parent_location_id');
        $location->save();

        return response()->json($location);
    }

    public function destroy($id)
    {
        $location = Location::find($id);

        if (!$location) {
            return response()->json(['message' => 'Location not found'], 404);
        }

        $location->delete();

        return response()->json(['message' => 'Location deleted successfully']);
    }
}
