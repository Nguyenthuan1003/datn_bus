<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = 'permissions';

    public function parentPermission() {
        return $this->belongsTo(ParentPermission::class, 'perent_permission_id');
    }

    public function rolePermission() {
        return $this->hasOne(RolePermission::class);
    }
}
