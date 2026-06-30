import os
import zipfile
import shutil

def zip_out_directory():
    cwd = os.getcwd()
    out_dir = os.path.join(cwd, 'out')
    zip_path = os.path.join(cwd, '..', '..', 'sitefinal_static_build.zip')
    
    if not os.path.exists(out_dir):
        print(f"Error: {out_dir} does not exist. Run npm run build first.")
        return
        
    print(f"Zipping contents of {out_dir} to {zip_path}...")
    
    # Delete old zip if it exists
    if os.path.exists(zip_path):
        try:
            os.remove(zip_path)
            print("Removed old zip file.")
        except Exception as e:
            print(f"Warning: Could not remove old zip: {e}")
            
    # Create the zip file with flat structure (compressing files INSIDE out/)
    try:
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(out_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    # Relative path to out_dir to avoid zipping the 'out' folder itself
                    arcname = os.path.relpath(file_path, out_dir)
                    zipf.write(file_path, arcname)
        print("Success! sitefinal_static_build.zip has been created successfully.")
    except Exception as e:
        print(f"Error zipping files: {e}")

if __name__ == '__main__':
    if os.environ.get('VERCEL') == '1' or os.environ.get('NETLIFY') == 'true' or os.environ.get('NOW_BUILDER') == '1':
        print("Skipping zip_build.py because we are building on Vercel/Netlify.")
    else:
        zip_out_directory()
