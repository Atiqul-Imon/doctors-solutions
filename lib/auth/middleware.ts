import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, TokenPayload } from './jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: TokenPayload;
}

export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  roles?: ('admin' | 'patient')[]
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized - No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const decoded = verifyAccessToken(token);

      if (roles && !roles.includes(decoded.role)) {
        return NextResponse.json(
          { error: 'Forbidden - Insufficient permissions' },
          { status: 403 }
        );
      }

      (req as AuthenticatedRequest).user = decoded;
      return handler(req as AuthenticatedRequest);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || 'Unauthorized' },
        { status: 401 }
      );
    }
  };
}

export function getAuthUser(req: NextRequest): TokenPayload | null {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

