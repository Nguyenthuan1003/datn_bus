<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    protected $table = 'locations';

    public function parentLocation()
    {
        return $this->belongsTo(ParentLocation::class, 'parent_locations_id');
    }
}
