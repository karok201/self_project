<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        public MediaService $mediaService
    ) {}
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Welcome', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        return Inertia::render('CreateProduct');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'string|required',
            'weight' => 'numeric',
            'price' => 'numeric|required',
            'description' => 'string|required',
            'image' => 'file|required|max:10000'
        ]);

        $imageId = $this->mediaService->saveMedia($request->file('image'));

        Product::create([
            'title' => $request->title,
            'weight' => $request->weight ?? null,
            'price' => $request->price,
            'description' => $request->description,
            'options' => json_encode(['image' => $imageId]),
        ]);

        return Redirect::route('welcome');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        return Inertia::render('Product', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Product $product
     * @return Response
     */
    public function edit(Product $product)
    {
        $image = Media::find($product->image());

        return Inertia::render('CreateProduct', [
            'product' => $product,
            'image' => $image,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
