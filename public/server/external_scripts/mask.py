import cv2
import numpy as np

# Load the Haar cascade for face detection
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Load the mask image
mask_image_path = 'mask.png'  # Ensure this path points to the mask image
mask_img = cv2.imread(mask_image_path, -1)  # Load with alpha channel

def resize_mask(mask, width, height):
    """Resize mask to fit on the face."""
    aspect_ratio = mask.shape[1] / mask.shape[0]
    new_height = int(width * aspect_ratio)
    resized_mask = cv2.resize(mask, (width, new_height))
    return resized_mask

def overlay_mask(frame, mask, x, y, w, h):
    """Overlay the mask on the face detected in the frame."""
    mask = resize_mask(mask, w, h)
    mask_height, mask_width = mask.shape[:2]

    # Ensure the mask does not go out of the frame boundaries
    if y + mask_height > frame.shape[0]:
        mask = mask[:frame.shape[0] - y, :, :]
    if x + mask_width > frame.shape[1]:
        mask = mask[:, :frame.shape[1] - x, :]

    # Update mask dimensions after potential cropping
    mask_height, mask_width = mask.shape[:2]

    roi = frame[y:y+mask_height, x:x+mask_width]

    # Create mask and inverse mask
    mask_alpha = mask[:, :, 3] / 255.0
    inverse_alpha = 1.0 - mask_alpha

    for c in range(0, 3):
        roi[:, :, c] = (roi[:, :, c] * inverse_alpha + mask[:, :, c] * mask_alpha).astype(np.uint8)

    frame[y:y+mask_height, x:x+mask_width] = roi
    return frame


def process_frame(frame, args, source_type=None):
    """Process the frame to overlay a mask on detected faces."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        frame = overlay_mask(frame, mask_img, x, y, w, h)
    return frame


if __name__ == '__main__':
    # Test the script with a webcam feed
    video_capture = cv2.VideoCapture(0)  # 0 is usually the default camera

    while True:
        ret, frame = video_capture.read()
        if not ret:
            break

        # Process the frame
        frame = process_frame(frame)

        # Display the resulting frame
        cv2.imshow('Video', frame)

        # Break the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()