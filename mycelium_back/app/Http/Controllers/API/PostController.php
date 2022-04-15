<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Mockery\Undefined;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $order = $request->header()["order"][0];
        $limit = $request->header()["limit"][0];
        $offset = $request->header()["offset"][0];
        
        // $posts = Post::all()->sortBy("score", SORT_REGULAR, true)->skip(intval($offset))->take(intval($limit));
        $posts = Post::all()->skip(intval($offset))->take(intval($limit));
        foreach ($posts as $key) {
            $key->username = User::where('id', $key->user_id)->firstOrFail()->username;
        }
        return response()->json($posts);
    }
    public function getAll()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'link' => 'required',
            'title' => 'required',
            'content' => 'required',
            'image' => 'required'
        ]);

        $post = Post::create([
            'user_id' => $request->user_id,
            'link' => $request->link,
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->image,
            'score' => 0,

        ]);

        return response()->json($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $username = user::where('id', $post->user_id)->get()[0]->username;
        $post->username = $username;
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response 
     */
    public function update(Request $request, Post $post)
    {
        // var_dump($request->test);
        // $this->validate($request, [
        //     'link' => 'required',
        //     'title' => 'required',
        //     'content' => 'required',
        //     'image' => 'required',
        //     'score' => 'required'

        // ]);

        // $post->update([
        //     'link' => $request->link,
        //     'title' => $request->title,
        //     'content' => $request->content,
        //     'image' => $request->content,
        //     'score' => $request->score
        // ]);

        if ($request->title != NULL) {
            $post->update([
                "title" => $request->title,
            ]);
        };
        if ($request->link != NULL) {
            $post->update([
                "link" => $request->link,
            ]);
        };
        if ($request->content != NULL) {
            $post->update([
                "content" => $request->content,
            ]);
        };
        if ($request->image != NULL) {
            $post->update([
                "image" => $request->image,
            ]);
        };
        if ($request->score != NULL) {
            $post->update([
                "score" => $request->score,
            ]);
        };

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        COMMENT::where("post_id", $post->id)->delete();
        $post->delete();
        return response()->json("post deleted...");
    }

    public function getPostByUser(Request $request)
    {
        $header = $request->header()["user-id"][0];
        $posts = POST::where('user_id', $header)->get();
        return response()->json($posts);
    }
}
