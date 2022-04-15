<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $favorite = Favorite::all();
        return response()->json($favorite);
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
            'favorite' => 'required',
        ]);

        $favorite = Favorite::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'favorite' => $request->favorite,
        ]);

        return response()->json($favorite);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function show(Favorite $favorite)
    {
        return response()->json($favorite);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorite $favorite)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'post_id' => 'required',
            'favorite' => 'required',
        ]);

        $favorite->update([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'favorite' => $request->favorite,
        ]);

        return response()->json();
    }

    public function getList(Request $request)
    {
        $user = $request->header()['user-id'][0];
        $fav = Favorite::where('user_id', $user)->get();
        return $fav;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favorite $favorite)
    {
        $favorite->delete();
        return response()->json();
    }
}
