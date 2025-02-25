import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { useVerifyKhaltiPayment } from "@/api/bookingApi";
import { bookingService } from "@/service/bookingService";

const PaymentVerifyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyPaymentMutation = useVerifyKhaltiPayment();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const pidx = params.get("pidx");
        const status = params.get("status");

        if (!pidx) {
          setError("Missing payment information");
          setVerifying(false);
          return;
        }

        if (status !== "Completed") {
          setError(`Payment ${status || "failed"}`);
          setVerifying(false);
          return;
        }
        await verifyPaymentMutation.mutateAsync({ pidx });

        setSuccess(true);
        setVerifying(false);

        // Download ticket after successful payment
        try {
          const pdfUrl = await bookingService.downloadTicket();
          window.open(pdfUrl, "_blank");
        } catch (err) {
          toast.error("Ticket download failed, please check your bookings");
        }
      } catch (err: any) {
        setError(err?.message || "Payment verification failed");
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location, verifyPaymentMutation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {verifying ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <h2 className="text-2xl font-bold">Verifying Payment</h2>
            <p className="text-gray-500">
              Please wait while we verify your payment...
            </p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-gray-600">
              Your booking has been confirmed. You can view your tickets in your
              booking history.
            </p>
            <Button onClick={() => navigate("/bookings")} className="mt-4">
              View My Bookings
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold">Payment Failed</h2>
            <p className="text-gray-600">
              {error || "There was an error processing your payment."}
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Return to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerifyPage;
