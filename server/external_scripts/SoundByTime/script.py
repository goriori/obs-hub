import os
import sys
import pyaudio
import time
import threading

#---Для импорта файлов VAudio и AppConfig---
current_dir = os.path.dirname(__file__)
parent_dir = os.path.dirname(current_dir)
grandparent_dir = os.path.dirname(parent_dir)
sys.path.insert(0, grandparent_dir)
#------
from vaudio import VAudio
from config import AppConfig

#Пути до папок
path_to_script_folder = os.path.dirname(os.path.realpath(__file__))
relative_path_to_script_folder = os.path.relpath(path_to_script_folder, os.getcwd())
relative_path_to_assets_folder = os.path.join(relative_path_to_script_folder, 'assets')
sound_path = f'{relative_path_to_assets_folder}/clap.mp3'

#MAIN SCRIPT FUNCTION
def play_sound(vaudio,args,source_type):
    vaudio.play_sound()
    print("Script sound played")
    delay = args['loop_time']
    #Если будет нужна задержка именно после нажатия, а не после проигрывания
    # if(vaudio.sound_duration > args['loop_time']):
    #     delay = 0
    time.sleep(delay)

def timer_play_sound(sec):
    while True:
        audio.play_sound()
        time.sleep(sec)  # задержка в секундах

if __name__ == '__main__':
    app_config = AppConfig()
    app_config.load_config('settings.json')
    audio_config = app_config.config["audio_sources"]["sound"]

    LOOP_TIME = 30 #play sound every 30 sec
    SOURCE_PATH = sound_path
    OUTPUT_DEVICE_INDEX = audio_config["device_output_index"]

    try:
        audio = VAudio(pyaudio.PyAudio(), sound_path = SOURCE_PATH, output_device_index = OUTPUT_DEVICE_INDEX)
    except Exception as e:
        print("VAudio create error:", e)
        exit("Check installation and reboot the computer.")

    audio.open(audio_config)

    try:
        play_sound(audio,{"loop_time":LOOP_TIME},"sound")

    except KeyboardInterrupt:
        print("Script cancel")
        sys.exit(0)
    finally:
        audio.close()
        