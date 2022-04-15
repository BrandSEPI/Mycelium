<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;


class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::create([
            'link' => 'https://stockx.com/fr-fr/', 'score' => '3', 'user_id' => '1', 'title' => 'StockX', 'content' => 'sneakers and streetwear you will love', 'image' => 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png'
        ]);
    }
}
