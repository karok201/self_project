<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\UploadedFile;

class MediaService
{

    public function saveMedia(UploadedFile $media, string $module = '', string $section = '', string $driver = 'local'): int
    {
        $path = $media->store('/files/', $driver);
        $data = [
            'path' => '/'.$path,
            'original_name' => $media->getClientOriginalName(),
            'size' => $media->getSize(),
            'type' => $media->getMimeType(),
            'section' => $section,
            'module' => $module
        ];
        return Media::create($data)->id;
    }

    public function getMedia(int $id): Media|null
    {
        $rec = Media::find($id);
        if (!$rec) return null;

        return new Media(
            $rec->original_name
        );
    }

    public function deleteMedia(int $id)
    {
        Media::destroy($id);
    }
}
