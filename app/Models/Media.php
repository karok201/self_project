<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'original_name',
        'type',
        'section',
        'module',
        'size',
        'options',
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
