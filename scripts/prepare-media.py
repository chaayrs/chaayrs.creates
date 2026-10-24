"""Prepare browser-friendly assets from the user's supplied original videos."""
import json, subprocess, sys
from pathlib import Path
sys.path.insert(0, '/private/tmp/cy-media-tools')
import imageio_ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
root = Path(__file__).resolve().parent.parent
media = root/'public/media'
originals = root/'.media-source'
originals.mkdir(exist_ok=True)
for source in media.glob('*-source.*'):
    source.rename(originals/source.name)
metadata = {}
for source in sorted(originals.glob('*-source.*')):
    slug = source.name.split('-source.')[0]
    target = media/f'{slug}.mp4'
    if not target.exists():
        subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-i',str(source),'-map_metadata','-1','-vf','scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1','-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-r','30','-c:a','aac','-b:a','96k','-movflags','+faststart','-threads','2',str(target)],check=True)
    poster = media/f'{slug}.jpg'
    subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-ss','1','-i',str(target),'-frames:v','1','-q:v','2',str(poster)],check=True)
    # Read stream metadata from ffmpeg independently of file existence.
    result = subprocess.run([ffmpeg,'-hide_banner','-i',str(target)],capture_output=True,text=True)
    import re
    match = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',result.stderr)
    duration = round(int(match[1])*3600+int(match[2])*60+float(match[3])) if match else 0
    metadata[slug] = {'duration':duration,'width':720,'height':1280,'bytes':target.stat().st_size}
    print(f'{slug}: {duration}s, {target.stat().st_size//1024} KB',flush=True)
# Decorative video is silent and separate from the full project files.
subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-ss','1','-i',str(media/'tokyo-budget.mp4'),'-t','8','-vf','scale=540:960','-an','-c:v','libx264','-preset','fast','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',str(media/'opening-loop.mp4')],check=True)
(root/'lib/media-metadata.json').write_text(json.dumps(metadata,indent=2)+'\n')
