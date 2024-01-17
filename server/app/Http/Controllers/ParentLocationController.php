<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParentLocation;

class ParentLocationController extends Controller
{
    public function index()
    {
        $parentLocations = ParentLocation::
        select('id', 'name', 'created_at', 'updated_at')
        ->get();
        return response()->json($parentLocations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $parentLocation = new ParentLocation();
        $parentLocation->name = $request->input('name');
        $parentLocation->save();
        return response()->json($parentLocation, 201);
    }

    public function show($id)
    {
        $parentLocation = ParentLocation::select('id', 'name')->find($id);

        if (!$parentLocation) {
            return response()->json(['message' => 'Parent location not found'], 404);
        }

        return response()->json($parentLocation);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $parentLocation = ParentLocation::find($id);
        $parentLocation->name = $request->input('name');
        $parentLocation->save();
        return response()->json([['message' => 'Parent location update successfully'], 'parent_location' =>$parentLocation], 200);
    }

    public function destroy($id)
    {
        $parentLocation = ParentLocation::find($id);

        if (!$parentLocation) {
            return response()->json(['message' => 'Parent location not found'], 404);
        }

        $parentLocation->delete();

        return response()->json(['message' => 'Parent location deleted successfully']);
    }
}
