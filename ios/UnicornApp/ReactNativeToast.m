#import "ReactNativeToast.h"



@implementation ReactNativeToast

// To export a module named ReactNativeToast
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show:(NSString *)text){
  UIAlertController * alert = [UIAlertController
                               alertControllerWithTitle:@"Logout"
                               message:text
                               preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* okButton = [UIAlertAction
                              actionWithTitle:@"Ok"
                              style:UIAlertActionStyleDefault
                              handler:^(UIAlertAction * action) {
                                
                              }];
  [alert addAction:okButton];
  UIViewController *viewController = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  if ( viewController.presentedViewController && !viewController.presentedViewController.isBeingDismissed ) {
    viewController = viewController.presentedViewController;
  }
  
  NSLayoutConstraint *constraint = [NSLayoutConstraint
                                    constraintWithItem:alert.view
                                    attribute:NSLayoutAttributeHeight
                                    relatedBy:NSLayoutRelationLessThanOrEqual
                                    toItem:nil
                                    attribute:NSLayoutAttributeNotAnAttribute
                                    multiplier:1
                                    constant:viewController.view.frame.size.height*2.0f];
  
  [alert.view addConstraint:constraint];
  [viewController presentViewController:alert animated:YES completion:^{}];
};

@end
