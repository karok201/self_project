<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'weight',
        'price',
        'description',
        'options'
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function image()
    {
        return json_decode($this->options, true)['image'];
    }
}
