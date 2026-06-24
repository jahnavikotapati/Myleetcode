class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1000000007
        m = r - l + 1

        def mat_mul(A, B):
            s = len(A)
            C = [[0] * s for _ in range(s)]
            for i in range(s):
                Ai = A[i]
                Ci = C[i]
                for k in range(s):
                    a = Ai[k]
                    if a:
                        Bk = B[k]
                        for j in range(s):
                            Ci[j] = (Ci[j] + a * Bk[j]) % MOD
            return C

        def mat_vec(M, v):
            s = len(M)
            res = [0] * s
            for i in range(s):
                row = M[i]
                cur = 0
                for j in range(s):
                    cur += row[j] * v[j]
                res[i] = cur % MOD
            return res

        def pow_apply(M, e, v):
            while e:
                if e & 1:
                    v = mat_vec(M, v)
                M = mat_mul(M, M)
                e >>= 1
            return v

        L = [[0] * m for _ in range(m)]
        R = [[0] * m for _ in range(m)]
        for i in range(m):
            for j in range(i):
                L[i][j] = 1
            for j in range(i + 1, m):
                R[i][j] = 1

        A = mat_mul(L, R)
        B = mat_mul(R, L)

        U2 = [i for i in range(m)]
        D2 = [m - 1 - i for i in range(m)]

        if n % 2 == 0:
            p = (n - 2) // 2
            U = pow_apply(A, p, U2)
            D = pow_apply(B, p, D2)
        else:
            U3 = mat_vec(L, D2)
            D3 = mat_vec(R, U2)
            p = (n - 3) // 2
            U = pow_apply(A, p, U3)
            D = pow_apply(B, p, D3)

        return (sum(U) + sum(D)) % MOD