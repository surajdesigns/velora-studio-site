import sys
from PIL import Image

def remove_white_bg(input_path, output_path, threshold=230):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Drop white-ish pixels
            if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Success: Image saved to " + output_path)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    remove_white_bg('/Users/suraj/Downloads/velora sudio logo.png', '/Users/suraj/Downloads/velora 2/logo-transparent.png')
