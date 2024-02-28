<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    protected $table = 'locations';

<<<<<<< HEAD
    protected $fillable = [
        'name',
        'description',
        'image',
        'parent_location_id'
    ];
    public function parentLocation()
    {
=======
    public function parentLocation() {
>>>>>>> ed3f9f48b0c6e8ad586393cfdc2d53e3095f6581
        return $this->belongsTo(ParentLocation::class, 'parent_location_id');
    }
}
