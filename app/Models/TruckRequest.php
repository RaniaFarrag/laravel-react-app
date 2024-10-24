<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TruckRequest extends Model
{
    protected $fillable = [
        'address',
        'weight',
        'size',
        'date',
        'status',
        'user_id'

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
