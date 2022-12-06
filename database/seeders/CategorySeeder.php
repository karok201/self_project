<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['title' => 'Заморозка'],
            ['title' => 'Пикник'],
            ['title' => 'Кофе МСК'],
            ['title' => 'Салаты'],
            ['title' => 'Горячее'],
            ['title' => 'Супы'],
            ['title' => 'Напитки'],
            ['title' => 'Хлеб'],
            ['title' => 'Выпечка'],
            ['title' => 'Сладкое'],
        ];
        foreach ($categories as $category) {
            Category::factory()->create([
                'title' => $category['title'],
            ]);
        }
    }
}
