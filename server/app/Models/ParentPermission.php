<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentPermission extends Model
{
    use HasFactory;

    protected $table = 'parent_permissions';

    public function permission() {
        return $this->hasMany(Permission::class);
    }
}
