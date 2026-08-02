"use client";

import { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Avatar,
  Input,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { updateProfile } from "@/lib/actions/profile";
import { uploadImage } from "@/lib/imageUpload";

export default function EditProfileModal({
  isOpen,
  onOpenChange,
  profile,
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;

    setName(profile.name || "");
    setPreview(profile.image || "");
    setImage(null);
  }, [profile]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = profile.image;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateProfile(profile._id, {
        name,
        image: imageUrl,
      });

      toast.success(
        "Profile updated successfully."
      );

      router.refresh();

      onOpenChange(false);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal>

      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
      >

        <Modal.Container
          size="lg"
          placement="center"
        >

          <Modal.Dialog>

            {({ close }) => (

              <>

                <Modal.CloseTrigger />

                <Modal.Header>

                  <Modal.Heading>
                    Edit Profile
                  </Modal.Heading>

                </Modal.Header>

                <form
                  id="edit-profile-form"
                  onSubmit={handleSubmit}
                >

                  <Modal.Body>

                    <div className="flex flex-col items-center gap-5">

                      <Avatar
                        src={preview}
                        name={name}
                        className="h-24 w-24"
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file =
                            e.target.files?.[0];

                          if (!file) return;

                          setImage(file);

                          setPreview(
                            URL.createObjectURL(
                              file
                            )
                          );
                        }}
                      />

                    </div>

                    <Input
                      label="Display Name"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      required
                    />

                    <Input
                      label="Email"
                      defaultValue={
                        profile.email
                      }
                      readOnly
                    />

                  </Modal.Body>

                  <Modal.Footer>

                    <Button
                      variant="light"
                      onPress={close}
                    >
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      type="submit"
                      form="edit-profile-form"
                      isLoading={loading}
                    >
                      Save Changes
                    </Button>

                  </Modal.Footer>

                </form>

              </>

            )}

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// import {
//   Avatar,
//   Button,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContainer,  
//   ModalFooter,
//   ModalHeader,
// } from "@heroui/react";



// import { updateProfile } from "@/lib/actions/profile";
// import { uploadImage } from "@/lib/imageUpload";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

// export default function EditProfileModal({
//   isOpen,
//   onOpenChange,
//   profile,
// }) {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);

//   const [preview, setPreview] = useState("");

//   const [loading, setLoading] =
//     useState(false);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setPreview(profile.image || "");
//     }
//   }, [profile]);
//   const router = useRouter();
//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       let imageUrl = profile.image;

//       // Upload new image if selected
//       if (image) {
//         imageUrl =
//           await uploadImage(image);
//       }

//       await updateProfile(
//         profile._id,
//         {
//           name,
//           image: imageUrl,
//         }
//       );

//       toast.success(
//         "Profile updated successfully."
//       );

//       onOpenChange(false);      

//         router.refresh();

//     } catch (err) {
//       console.log(err);

//       toast.error(
//         "Failed to update profile."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       size="lg"
//     >
//      <ModalContainer>

//   <ModalHeader>
//     Edit Profile
//   </ModalHeader>

//   <form onSubmit={handleSubmit}>

//      <ModalBody>

//                 {/* Avatar */}

//                 <div className="flex flex-col items-center gap-4">

//                   <Avatar
//                     src={preview}
//                     className="h-24 w-24"
//                   />

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file =
//                         e.target.files[0];

//                       if (!file) return;

//                       setImage(file);

//                       setPreview(
//                         URL.createObjectURL(
//                           file
//                         )
//                       );
//                     }}
//                   />

//                 </div>

//                 {/* Name */}

//                 <Input
//                   label="Display Name"
//                   value={name}
//                   onChange={(e) =>
//                     setName(
//                       e.target.value
//                     )
//                   }
//                   required
//                 />

//                 {/* Email */}

//                 <Input
//                   label="Email"
//                   value={
//                     profile.email
//                   }
//                   readOnly
//                 />

//               </ModalBody>

//     <ModalFooter>

//       <Button
//         variant="light"
//         onPress={() => onOpenChange(false)}
//       >
//         Cancel
//       </Button>

//       <Button
//         color="primary"
//         type="submit"
//         isLoading={loading}
//       >
//         Save Changes
//       </Button>

//     </ModalFooter>

//   </form>

// </ModalContainer>
//     </Modal>
//   );
// }



// Modal container

//  <ModalContainer>
//         {(onClose) => (
//           <>
//             <ModalHeader>
//               Edit Profile
//             </ModalHeader>

//             <form
//               onSubmit={handleSubmit}
//             >
//               <ModalBody>

//                 {/* Avatar */}

//                 <div className="flex flex-col items-center gap-4">

//                   <Avatar
//                     src={preview}
//                     className="h-24 w-24"
//                   />

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file =
//                         e.target.files[0];

//                       if (!file) return;

//                       setImage(file);

//                       setPreview(
//                         URL.createObjectURL(
//                           file
//                         )
//                       );
//                     }}
//                   />

//                 </div>

//                 {/* Name */}

//                 <Input
//                   label="Display Name"
//                   value={name}
//                   onChange={(e) =>
//                     setName(
//                       e.target.value
//                     )
//                   }
//                   required
//                 />

//                 {/* Email */}

//                 <Input
//                   label="Email"
//                   value={
//                     profile.email
//                   }
//                   readOnly
//                 />

//               </ModalBody>

//               <ModalFooter>

//                 <Button
//                   variant="light"
//                   onPress={onClose}
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   color="primary"
//                   type="submit"
//                   isLoading={loading}
//                 >
//                   Save Changes
//                 </Button>

//               </ModalFooter>
//             </form>
//           </>
//         )}
//       </ModalContainer>