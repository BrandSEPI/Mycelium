<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Score;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scores = Score::all();
        return response()->json($scores);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Response $response)
    {

        $this->validate($request, [
            'user_id' => 'required',
            'post_id' => 'required',
            'score' => 'required',
        ]);

        $score = Score::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'score' => $request->score
        ]);

        if ($response->getStatusCode() == 200) {
            $myPost = Post::where('id', $request->post_id)->get()[0];
            $myPost->update(
                ["score" => $myPost->score += $request->score]
            );
        }
        return response()->json($score);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function show(Score $score)
    {
        return response()->json($score);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Score $score, Response $response)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'post_id' => 'required',
            'score' => 'required',
        ]);

        $score->update([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'score' => $request->score,
        ]);
        if ($response->getStatusCode() == 200) {
            $myPost = Post::where('id', $request->post_id)->get()[0];
            $myPost->update(
                ["score" => $myPost->score += $request->score]
            );
        }
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Score  $score
     * @return \Illuminate\Http\Response
     */
    public function destroy(Score $score)
    {
        $score->delete();
        return response()->json();
    }

    public function getScore(Request $request)
    {
        $postId = $request->header()["post-id"][0];
        $scores =  Score::where('post_id', $postId)->get();
        return response()->json($scores);
    }
}
