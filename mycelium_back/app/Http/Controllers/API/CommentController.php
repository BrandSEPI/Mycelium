<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $header = $request->header()["post-id"][0];
        $comments = Comment::where('post_id', $header)->get();
        foreach ($comments as $key) {
            $key->username = User::where('id', $key["user_id"])->firstOrFail()->username;
        }
        return response()->json($comments);
    }
    public function getAll()
    {

        $comments = Comment::all();
        return response()->json($comments);
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
            'post_id' => 'required',
            'content' => 'required',
            'hide' => 'required',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'content' => $request->content,
            'hide' => $request->hide,

        ]);
        $comment->username = User::where('id', $request->user_id)->firstOrFail()->username;
        return response()->json($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $this->validate($request, [
            'content' => 'required',
            'hide' => 'required',
        ]);

        $comment->update([
            'content' => $request->content,
            'hide' => $request->hide,

        ]);
        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json("comment deleted...");
    }
    public function getCommentsOfUser(Request $request)
    {
        $header = $request->header()["user-id"][0];
        // var_dump($header);
        $com = COMMENT::where('user_id', $header)->get();
        return response()->json($com);
    }
}
