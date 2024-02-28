<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    protected $table = 'locations';

    protected $fillable = [
        'name',
        'description',
        'image',
        'parent_location_id'
    ];
    public function parentLocation()
    {
        return $this->belongsTo(ParentLocation::class, 'parent_location_id');
    }
}
